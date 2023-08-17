const serverless = require('serverless-http');
const Server = require('../Social-Media/src/server.js')
require('dotenv').config()


const serverInstance = new Server();

if(process.env.DEVELOPMENT === 'false'){

    
     serverInstance.execute();
    
}

module.exports.handler = serverless(serverInstance.app);



