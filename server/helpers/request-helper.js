'use strict';

const Promise = require('bluebird');
const http = require('https');

module.exports = Promise.method(function(options) { console.log(options);
    return new Promise(function(resolve, reject) { 
        var request = http.request(options, function(response) {
            // Bundle the result
            var result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'body': '',
                'trailers': response.trailers,
            }; console.log(response);

            // Build the body
            response.on('data', function(chunk) {
                result.body += chunk;
            });

            // Resolve the promise when the response ends
            response.on('end', function() {  console.log(result);
                resolve(result);
            });
        });

        // Handle errors
        request.on('error', function(error) {
            console.log('Problem with request:', error);
            reject(error);
        });

        // Must always call .end() even if there is no data being written to the request body
        request.end();
    });
});