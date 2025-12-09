const { removeIndicesAndTriggers } = require("./tsVector/searchReadyDisable");
const { addTrgmExtension } = require("./trigram/fuzzySearchEnable");
const {
  addTSVectorColumn,
  createTriggerAndFunction,
  updateExistingData,
  createIndex,
} = require("./tsVector/searchReadyEnable");
const { removeTrgmExtension } = require("./trigram/fuzzySearchDisable");

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
        const results = await Promise.allSettled(
          trigrams.map(({ name }) =>{
            addTrgmExtension(name, queryInterface);
          })
        );
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`Failed to enable searchReady for table "${searchable[index].table}", column "${searchable[index].column}":`,
            result.reason);
          }
        });
        console.log("fuzzy search functionality successfully enabled.");
      }
    } catch (e) {
      console.error("search enabling failed:", e.message);
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
        const results = await Promise.allSettled(
          trigrams.map(({ name }) =>{
            removeTrgmExtension(name, queryInterface);
          })
        );
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`Failed to disable ${trigrams[index].name} extension:`, result.reason);
          }
        });
        console.log("fuzzy search functionality successfully disabled.");
      }
    } catch (e) {
      console.error("search disabling failed:", e.message);
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
