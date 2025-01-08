const Sequelize = require('sequelize');
const sequelize = require('../../db');
const queryInterface = sequelize.getQueryInterface();


module.exports = {
    queryInterface, 
    Sequelize, 
    searchable: [
    {
        table: "info_help_answers", 
        column: "searchable",
        createParams: "setweight(to_tsvector('english', NEW.title), 'A') || setweight(to_tsvector(COALESCE(NEW.text, '')), 'B')",
        updateParams: "setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector(COALESCE(text, '')), 'B')",
    },
        {
            table: "devices", 
            column: "searchable",
            createParams: "to_tsvector('simple', COALESCE(name, ''))",
            updateParams: "to_tsvector('simple', COALESCE(name, ''))",
        }
        ,{
            table: "device_infos", 
            column: "searchable",
            createParams: "setweight(to_tsvector('english', NEW.title), 'A') || setweight(to_tsvector('simple', COALESCE(NEW.description, '')), 'B')",
            updateParams: "setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('simple', COALESCE(description, '')), 'B')",
        }
    ],
    trigrams: [{name: 'pg_trgm'}]
}