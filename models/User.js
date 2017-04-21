const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        default: 'Lambda'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bots: [{
        type: Schema.Types.ObjectId,
        ref: 'Bot'
    }],
    role: {
        type: String,
        default: 'user'
    },
    credit: {
        type: Number,
        default: 0       
    }
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);