const serverless = require('serverless-http');
const Server = require('../Backend/src/server.js')
require('dotenv').config()


const serverInstance = new Server();

serverInstance.execute();

module.exports.handler = serverless(serverInstance.app);



