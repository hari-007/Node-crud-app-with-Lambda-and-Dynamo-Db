'use strict';

let config = module.exports;

config.awsCreds = {
    region : process.env.aws_region || 'us-east-1',
    service : process.env.service || 'execute-api',
    APIKey : process.env.APIKey || '',
    host : process.env.APIKey ? 
                    process.env.APIKey +'.'+ process.env.service +'.'+ process.env.region +'.amazonaws.com'
                    : null,
    path : process.env.path ? '/'+ process.env.path : '',
    deployStage : process.env.deployStage ? '/'+process.env.deployStage : ''
}