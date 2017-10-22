/**
 * 
 * review.js
 * defining schema for review
 *
 */

var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    title       : String
    , text      : String
});

module.exports = mongoose.model('Review', reviewSchema);
