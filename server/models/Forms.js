const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Form = mongoose.model('Form');

module.exports = Form;