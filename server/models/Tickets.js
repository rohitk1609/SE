const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const form_obj = require('../models/Forms');

const form_schema = form_obj.schema;

const ticketSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    ticket: {
        type: String,
            required: true
      },
      floated_user: {
        type: String,
        required: true
      },
      status: {
        type: Number,
        required: true
      },
      child: form_schema,
      current_holder: {
          type: String,
          required: true
      },
      close: {
          type: Boolean,
          required: true
      },
      result: {
        type: Boolean,
        
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


const Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;