'use strict';

const Promise = require('bluebird');
const http = require('https');

module.exports = Promise.method(function(options) {;
    return new Promise(function(resolve, reject) { 
        var request = http.request(options, function(response) {
            // Bundle the result
            var result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'body': '',
                'trailers': response.trailers,
            };

            // Build the body
            response.on('data', function(chunk) {
                result.body += chunk;
            });

            // Resolve the promise when the response ends
            response.on('end', function() {
                resolve(result);
            });
        });

        // write Request body for ALL the Methods except 'GET'
        if(options.method.indexOf('GET') == -1) {
            request.write(options.body);
        }
            
        // Handle errors
        request.on('error', function(error) {
            reject(error);
        });

        // Must always call .end() even if there is no data being written to the request body
        request.end();
    });
});