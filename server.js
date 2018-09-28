var express = require('express');
var path    = require('path');

console.log('argv', process.argv);

var sConfigFile = 'config';
process.argv.forEach(function(sArg)
{
    if (sArg.match(/config=(.*)/) !== null) {
        sConfigFile = sArg.match(/config=(.*)/)[1];
    }
});

var sConfigPath = path.resolve(__dirname, 'config/' + sConfigFile + '.json');
var sDistPath   = path.resolve(__dirname, 'dist');

var oConfig    = require(sConfigPath);
var oApp       = express();

oApp.use(express.static(sDistPath));

oApp.get('/', function(oReq, oRes)
{
    oRes.sendFile(path.resolve(sDistPath, 'index.html'));
});

oApp.listen(3000);