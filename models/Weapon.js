const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const WeaponSchema = Schema({
    damage: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bot: {
        type: Schema.Types.ObjectId,
        ref: 'Bot'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

WeaponSchema.plugin(timestamps);

module.exports = mongoose.model('Weapon', WeaponSchema);