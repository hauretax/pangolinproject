const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PangolinSchema = mongoose.Schema({
    pseudo: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    class: {type: String, required:false},
    friend: {type: Object, required:false}
});

PangolinSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pangolin', PangolinSchema);