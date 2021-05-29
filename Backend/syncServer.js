const express = require('express');

const app = express();
app.use();

const db = require('./models')
const Role = db.role

db.Sequelize.sync()
/*db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync DB');
    initial();
})*/
/*
function initial() {
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'admin'
    })
}*/