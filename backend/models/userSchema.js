const mongoose = require('mongoose');

// Define Device Schema
const DeviceSchema = new mongoose.Schema({
    deviceid: { type: String, required: true },
    devicename: { type: String, required: true },
    location: { type: String, required: true },
    devicetype: { type: String, required: true },
});

// Define Room Schema
const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Define User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rooms: [RoomSchema],
    devices: [DeviceSchema],
});

// Create a model from the User Schema
const UserDetails = mongoose.model("UserDetails", UserSchema);

// Export the schemas and model
module.exports = {
    UserDetails,
    DeviceSchema,
    RoomSchema
};
