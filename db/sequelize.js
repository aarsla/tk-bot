const { Sequelize } = require('sequelize');
const EventModel = require('./models/event')

sequelize = new Sequelize({
    dialect: 'sqlite',
    models: [EventModel],
    logging: false,
    storage: './data/database.sqlite'
});

const Event = EventModel(sequelize, Sequelize)

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database ready!`)
    })

module.exports = {
    Event,
}
