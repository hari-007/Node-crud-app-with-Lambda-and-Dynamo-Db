'use strict';

const aws4 = require('aws4');
const request = require('../helpers/request-helper');
const config = require('../config/config');

class AWSService {
    constructor(tableName) {
        this.table = tableName;
        this.awsRequestObj = {
            hostname: config.awsCreds.host,
            path: config.awsCreds.deployStage + config.awsCreds.path,
            headers: { 'Content-Type': 'application/json', "cache-control": "no-cache" }
        }
    }
}

AWSService.prototype.getAllItems = function(callback) {
    this.awsRequestObj.method = "GET";
    this.awsRequestObj.path += '?TableName=' +this.table;
    request(aws4.sign(this.awsRequestObj)).then(function(response) {
        callback(response.body);
    }, function(err) {
        callback(err)
    }); 
}

AWSService.prototype.updateItem = function(item, callback) {
    this.awsRequestObj.method = "PUT";
    this.awsRequestObj.body = JSON.stringify(item);
    request(aws4.sign(this.awsRequestObj)).then(function(response) {
        callback(response.body);
    }, function(err) {
        callback(err)
    });
}

AWSService.prototype.setItem = function(newItem, callback) {
    this.awsRequestObj.method = "POST";
    this.awsRequestObj.body = JSON.stringify(newItem);
    request(aws4.sign(this.awsRequestObj)).then(function(response) {
        callback(response.body);
    }, function(err) {
        callback(err)
    });
}

AWSService.prototype.deleteItem = function(item, callback) {
    this.awsRequestObj.method = "DELETE";
    this.awsRequestObj.body = JSON.stringify(item);
    request(aws4.sign(this.awsRequestObj)).then(function(response) {
        callback(response.body);
    }, function(err) {
        callback(err)
    });
}

module.exports = AWSService;