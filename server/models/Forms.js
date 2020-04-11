const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const formSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    form: {
        type: String,
            required: true
      },
      roles: {
        type: {type: String},
        value: [String]
      }

    }
    ,
    { versionKey: false },
      {
        id: false,
        toObject: {
          virtuals: true,
          getters: true
        },
        toJSON: {
    
    
          virtuals: true,
          getters: true,
          setters: false
        }
    });


const Form = mongoose.model('Form',formSchema);

module.exports = Form;