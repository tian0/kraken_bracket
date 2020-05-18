const ccxt = require("./node_modules/ccxt");
const prompt = require("./node_modules/prompt");
const { config } = require("./config.js");

if (config().stop > config().target) {
    side = "buy"
} else if (config().stop < config().target) {
    side = "sell"
} else {
    console.log("no side defined")
}
var time = new Date()

let exch = new ccxt['kraken']
const credentials = config().credentials
exch.apiKey = credentials.client_id
exch.secret = credentials.client_secret

prompt.start()
console.log("")
console.log("CHECK INPUTS:")

console.log('Stop:  ', config().stop, " USD")
console.log('Entry: ', config().entry, " USD")
console.log('Target: ', config().target, ' USD')
console.log('R/R:', Number((config().target-config().entry)/(config().entry-config().stop)).toFixed(2))
console.log('Size:  ', config().size, " Lots");
console.log('Risk:  ', config().size*Math.abs((config().entry-config().stop)), ' USD');
console.log('Time:  ', time)
console.log("CONTINUE WITH TRADE? Y for yes")
prompt.get(["verified"], function (err, trade) {
    if (trade.verified == "Y") {
        const stopOrder = exch.createOrder(config().asset, "stop-loss", side, config().size, config().stop, params = { reduce_only: true })
            .then((msg) => {
                console.log("Stop order sent: ", msg)
            })
            .catch((err) => {
                console.log("No love for stop order: ", err)
            })

        const targetOrder = exch.createOrder(config().asset, "take-profit", side, config().size, config().target, params = { reduce_only: true })
            .then((msg) => {
                console.log("Target order sent: ", msg)
            })
            .catch((err) => {
                console.log("No love for take profit: ", err)
            })
    }
    else if (trade.verified != "Y") {
        console.log("NO TRADE")
    }
})

