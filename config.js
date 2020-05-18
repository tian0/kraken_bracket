const cred = require('./MOVE_THIS_FILE/env.json')
//Private API credentials in env.json file to be stored OUTSIDE project root directory
//Update the above require directory with new path "../Other_folder/env.json"


function config() {

    //Insert entry and stop levels, trade size

    const asset = `BTC/USD`  //Use proper string for websocket name found at api.kraken.com/0/public/AssetPairs
    const entry = 9890;
    const stop = 10180;
    const target = 9180;

    const size = 10.0; //Size in lots, for Kraken

    const credentials = {
        client_id: cred["kraken"].apiKey ,
        client_secret: cred["kraken"].secret 
    }

    return { asset, entry, stop, target, size, credentials }
}

module.exports = { config }