const models = require('../models/User.js');
const dbConfig = require('../config/db.config.js')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

/*Inscription
async function inscription (req, res, next){
    let sql = 
}*/