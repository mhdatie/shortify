const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema({
    urlId: { type: Number, ref: 'LinkModel', required: true },
    geo: { type: String },
    browser: { type: String },
    platform: { type: String }
}, {
    timestamps: true,
    collection: 'analytics'
});

module.exports = mongoose.model('AnalyticsModel', AnalyticsSchema);