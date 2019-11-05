let mongoose = require("mongoose")

let username = "leopan"
let password = "leo123456"
let mongodburl = "mongodb+srv://" + username + ":" + password + "@wit-tracking-system-cluster-t9uwg.mongodb.net/tracingsdb"
mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})

module.exports = mongoose
