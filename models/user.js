const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');
const fs = require('fs');
const path = require('path');

var User = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true
    },
    profileImg: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('User', User);