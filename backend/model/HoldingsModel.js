const { model } = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingsSchema");

const HoldingsModel = model("holding", HoldingsSchema, "holdings");

module.exports = { HoldingsModel };
