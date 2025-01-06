class TSVectorSearchDisable {
    removeIndicesAndTriggers = async (queryInterface, Sequelize, table, column, createParams, updateParams) => {
        try {
            // Drop the trigger
            await queryInterface.sequelize.query(`
              DROP TRIGGER IF EXISTS update_searchable_${table}_trigger ON ${table};
            `);
      
            // Drop the trigger function
            await queryInterface.sequelize.query(`
              DROP FUNCTION IF EXISTS update_searchable_column_${table};
            `);
      
            // Drop the tsvector column
            await queryInterface.sequelize.query(`
            ALTER TABLE ${table} DROP COLUMN ${column}; 
            `);
      
            console.log(`Dropped column, function, trigger and indices for table ${table}.`);
          } catch (e) {
            console.error(`failed to drop column, function, trigger and indices for table ${table}. `, e.message);
            throw e;
          }
    };
    
}

module.exports = new TSVectorSearchDisable();