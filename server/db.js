const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
    // Heroku production
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,       // optional
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Heroku requires this
            },
        },
    });
} else {
    // Local development
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
            logging: console.log, // optional
        }
    );
}

module.exports = sequelize;
