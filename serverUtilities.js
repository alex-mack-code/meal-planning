// setup port
let HTTP_PORT = process.env.PORT || 3000;

// return http port in use
module.exports.getHttpPort = function ()
{
    return HTTP_PORT;
};

// check if server is listening
module.exports.onHttpStart = function () 
{
    console.log("Express http server listening on: " + HTTP_PORT);
};