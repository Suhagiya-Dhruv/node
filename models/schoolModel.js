const mongoose = require('mongoose');
const { v4 } = require('uuid')

const SchoolModel = mongoose.Schema({
    id: {
        type: String,
        default: v4
    },
    name: {
        type: String,
        required: true,
        minLength: 4
    },
    address: {
        type: String,
    },
    branch: {
        type: Number,
        unique: [true, "Branch code duplicate not allowd"]
    }
}, { versionKey: false });

module.exports = mongoose.model('schoolData', SchoolModel)