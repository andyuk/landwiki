var mongoose = require('mongoose');
	_ = require('underscore');
mongoose.connect('mongodb://localhost/landwiki');

var landSchema = mongoose.Schema({
  longitude: Number,
  latitude: Number,
  labels:   String,
  status: Number,
  updated: { type: Date, default: Date.now },
  originalData: mongoose.Schema.Types.Mixed
});
var Land = mongoose.model('land', landSchema);

var lastUpdated = 1;
var i = 1;

// if (!landSchema.options.toObject) landSchema.options.toObject = {};
// landSchema.options.toObject.transform = function (doc, ret, options) {
//   var originalData = ret;
//   delete originalData._id;
//   return {
// 	longitude: ret.Longitude,
// 	latitude: ret.Latitude,
// 	labels: 'nlud-pdl-2009 hca ukgov brownfield',
// 	status: 1,
// 	originalData: originalData
//   };
// }

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!

  console.log('connection open');

	Land
	.find({ updated:  { $ne: '1' }  })
	//.find()
	//.select('_id')
	.limit(10)
	.exec(function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		results.forEach(function(doc) {

			var originalData = doc.toObject();

			var landRecord = {
				longitude: originalData.Longitude,
				latitude: originalData.Latitude,
				title: originalData.Title,
				labels: 'nlud-pdl-2009 hca ukgov brownfield',
				status: 1,
				originalData: originalData
			};
			delete landRecord.originalData._id;
			delete landRecord.originalData.EASTING;
			delete landRecord.originalData.NORTHING;
			delete landRecord.originalData.Label1;
			delete landRecord.originalData.Labels;
			delete landRecord.originalData.Latitude;
			delete landRecord.originalData.Longitude;
			delete landRecord.originalData.updated;
			delete landRecord.originalData.title;

			console.log(landRecord);
			var newLand = new Land(landRecord);

			newLand.save(function(err, newDoc, numberAffected) {
				if (err) {
					console.log('Failed to save', err);
					return;
				}
				console.log('%d updated %s, %s records updated', i++, newDoc._id, numberAffected);
			});
		});
	});
});
