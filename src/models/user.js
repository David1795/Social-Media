const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'Please add a name'],
    },
    apellido: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
        type: String,
        default: 'regular',
    }

},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('User', UserSchema)

