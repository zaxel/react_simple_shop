const { removeIndicesAndTriggers } = require("./tsVector/searchReadyDisable");
const {
  addTSVectorColumn,
  createTriggerAndFunction,
  updateExistingData,
  createIndex,
} = require("./tsVector/searchReadyEnable");

module.exports = {
  up: async function ({ queryInterface, Sequelize, searchable, trigrams }) {
    try {
      if (searchable.length > 0) {
        const results = await Promise.allSettled(
          searchable.map(({ table, column, createParams, updateParams }) =>
            this.searchReadyEnable(queryInterface, Sequelize, table, column, createParams, updateParams)
          )
        );
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`Failed to enable searchReady for ${searchable[index].table}:`, result.reason);
          }
        });
      }

      if (trigrams.length > 0) {
        console.log("Enabling fuzzy search functionality...");
        console.warn("Trigram functionality not implemented yet.");
      }
    } catch (e) {
      console.error("Migration failed:", e.message);
      throw e;
    }
  },

  down: async function ({ queryInterface, Sequelize, searchable, trigrams }) {
    try {
      const results = await Promise.allSettled(
        searchable.map(({ table, column, createParams, updateParams }) =>
          removeIndicesAndTriggers(queryInterface, Sequelize, table, column, createParams, updateParams)
        )
      );
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Failed to disable searchReady for ${searchable[index].table}:`, result.reason);
        }
      });

      if (trigrams.length > 0) {
        console.log("Disabling fuzzy search functionality...");
        console.warn("Trigram functionality not implemented yet.");
      }
    } catch (e) {
      console.error("Rollback failed:", e.message);
      throw e;
    }
  },

  searchReadyEnable: async function (
    queryInterface,
    Sequelize,
    table,
    column,
    createParams,
    updateParams
  ) {
    try {
      await Promise.all([
        addTSVectorColumn(queryInterface, Sequelize, table, column, createParams, updateParams),
        createTriggerAndFunction(queryInterface, Sequelize, table, column, createParams, updateParams),
        updateExistingData(queryInterface, Sequelize, table, column, createParams, updateParams),
        createIndex(queryInterface, Sequelize, table, column, createParams, updateParams),
      ]);
    } catch (e) {
      console.error(`Failed to enable searchReady for table "${table}":`, e.message);
      throw e;
    }
  },
};
