var mongoose = require('mongoose');
    
var landSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
  title: String,
  labels:   String,
  status: Number,
  icon: String,
  updated: { type: Date, default: Date.now },
  originalData: mongoose.Schema.Types.Mixed
});

// Schema.methods.copy = function(options, callback) {

// };

module.exports.schema = landSchema;
module.exports.model = mongoose.model('Land', landSchema);