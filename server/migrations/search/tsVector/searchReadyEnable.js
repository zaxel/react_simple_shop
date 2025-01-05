class TSVectorSearchReady {
    addTSVectorColumn = async (queryInterface, Sequelize, table, column, createParams, updateParams) => {
        try{
            const query = `
          SELECT column_name
          FROM information_schema.columns
          WHERE table_name = $1 AND column_name = $2;
        `;
        const result = await queryInterface.sequelize.query(query, {
          bind: [table, column],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        });
        if (!result.length) {
          await queryInterface.sequelize.query(
            `ALTER TABLE ${Sequelize.Utils.escapeId(table)} ADD COLUMN ${Sequelize.Utils.escapeId(column)} tsvector;`
          );
          console.log(`Added tsvector column "${column}" to table "${table}".`);
        } else {
          console.log(`Column "${column}" already exists in table "${table}".`);
        }
        }catch(e){
            console.error("failed to create the tsvector column: ", e.message);
            throw e;
        }
        
    };
    
    createTriggerAndFunction = async (queryInterface, Sequelize, table, column, createParams, updateParams) => {
        try{
            const triggerName = `update_searchable_${table}_trigger`;
        const triggerExistsQuery = `
          SELECT tgname
          FROM pg_trigger
          WHERE tgname = $1;
        `;
        const triggerExists = await queryInterface.sequelize.query(triggerExistsQuery, {
          bind: [triggerName],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        });
    
        if (!triggerExists.length) {
          const functionName = `update_searchable_column_${table}`;
          await queryInterface.sequelize.query(`
            CREATE OR REPLACE FUNCTION ${functionName}()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW.${column} := ${createParams};
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
          `);
          console.log(`Created trigger function "${functionName}".`);
    
          await queryInterface.sequelize.query(`
            CREATE TRIGGER ${triggerName}
            BEFORE INSERT OR UPDATE ON ${table}
            FOR EACH ROW EXECUTE FUNCTION ${functionName}();
          `);
          console.log(`Attached trigger "${triggerName}" to table "${table}".`);
        } else {
          console.log(`Trigger "${triggerName}" already exists.`);
        }
        }catch(e){
            console.error("failed to create or assign the trigger: ", e.message);
            throw e;
        }
        
        
    };
    
    updateExistingData = async (queryInterface, Sequelize, table, column, createParams, updateParams) => {
        try{
            const res = await queryInterface.sequelize.query(`
                UPDATE ${table} SET ${column} = ${updateParams};
              `);
              console.log(`Precomputed values for "${column}" in table "${table}".`);
        }catch(e){
            console.error("failed to update data in existed tsvector column: ", e.message);
              throw e;
        }
    };
    
    createIndex = async (queryInterface, Sequelize, table, column, createParams, updateParams) => {
        try{
            const indexQuery = `
          SELECT indexname
          FROM pg_indexes
          WHERE tablename = $1 AND indexname = $2;
        `;
        const indexName = `${column}_idx`;
        const indexExists = await queryInterface.sequelize.query(indexQuery, {
          bind: [table, indexName],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        });
    
        if (!indexExists.length) {
          await queryInterface.sequelize.query(`
            CREATE INDEX ${indexName} ON ${table} USING gin(${column});
          `);
          console.log(`Created index "${indexName}" on column "${column}".`);
        } else {
          console.log(`Index "${indexName}" already exists.`);
        }
        }catch(e){
            console.error("failed to add the indices: ", e.message);
            throw e;
        }
    };
}

module.exports = new TSVectorSearchReady();
