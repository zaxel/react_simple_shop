class FuzzySearchEnable {
    addTrgmExtension = async (name, queryInterface) => {
      try {
        const extension = await queryInterface.sequelize.query(
          `
            SELECT extname
            FROM pg_extension
            WHERE extname = $1;
          `,
          { 
            bind: [name], 
            type: queryInterface.sequelize.QueryTypes.SELECT 
          }
        );
  
        if (!extension.length) {
          await queryInterface.sequelize.query(`
            CREATE EXTENSION ${name};
          `);
          console.log(`Extension "${name}" successfully enabled.`);
        } else {
          console.log(`Extension "${name}" is already enabled.`);
        }
      } catch (e) {
        console.error(`Failed to enable extension "${name}":`, e.message);
        throw e;
      }
    };
  }
  
  module.exports = new FuzzySearchEnable();
  