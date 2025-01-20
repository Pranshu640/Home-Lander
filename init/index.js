const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/Homelander";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    initData.data = initData.data.map((obj) => ({...obj , owner : "67820b628a0f26556d27c1ed"}));
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
