const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const challengeSchema = Schema({
    date: {
        type: String,
        // required: true
    },
    target: [{
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }],
    source: [{
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }],
    status: {
        type: String,
        default : 'pending'
    },
    bots: [{
        type: Schema.Types.ObjectId,
        ref: 'Bot'
    }],
    winner: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
});

challengeSchema.plugin(timestamps);

module.exports = mongoose.model('Challenge', challengeSchema);
