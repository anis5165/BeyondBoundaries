const {Schema, model} = require("../connection")
const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type:String, require: true, unique: true},
    role: {type: String, require: true, enum: ["business", "partner"]},
    password: {type: String, require: true}
});

module.exports = model("user", userSchema);