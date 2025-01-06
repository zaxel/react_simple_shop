class FuzzySearchDisable {
    removeTrgmExtension = async (name, queryInterface) => {
      try {
        await queryInterface.sequelize.query(
          `DROP EXTENSION IF EXISTS ${name} CASCADE;`
        );
        console.log(`Extension "${name}" successfully disabled.`);
      } catch (e) {
        console.error(`Failed to disable extension "${name}":`, e.message);
        throw e;
      }
    };
  }
  
  module.exports = new FuzzySearchDisable();
  