const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: 'counters'
});

module.exports = mongoose.model('CounterModel', CounterSchema);