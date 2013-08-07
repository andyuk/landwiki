var mongoose = require('mongoose');
	_ = require('underscore'),
	async = require('async');
mongoose.connect('mongodb://localhost/landwiki');

var landSchema = mongoose.Schema({
  longitude: Number,
  latitude: Number,
  title: String,
  labels:   String,
  status: Number,
  icon: String,
  updated: { type: Date, default: Date.now },
  originalData: mongoose.Schema.Types.Mixed
});
var Land = mongoose.model('land', landSchema);

var i = 1;

function calculateIcon(data) {
	if (data['Planning status'] !== 'None')
		return 'small_red';
	return 'measle_brown';
}

function batchUpdate() {

	Land
	.find({ "status":  { "$exists" : false } })
	.limit(500)
	.exec(function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		async.forEach(results, function(doc, callback) {

			var originalData = doc.toObject();

			var landRecord = {
				longitude: originalData.Longitude,
				latitude: originalData.Latitude,
				title: originalData.Title,
				labels: 'nlud-pdl-2009 hca ukgov brownfield',
				status: 1,
				originalData: originalData,
				icon: calculateIcon(originalData)
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

			doc.status = 0;
			doc.save();

			//console.log(landRecord);
			var newLand = new Land(landRecord);
			newLand.save(function(err, newDoc, numberAffected) {
				if (err) {
					console.log('Failed to save', err);
					return callback(err);
				}
				console.log('%d updated %s, %s records updated', i++, newDoc._id, numberAffected);

				callback(err);
			});
		}, function onComplete(err) {
			if (err) {
				console.log(err);
				return;
			}
			if (results.length > 0)
				batchUpdate();
			else 
				console.log('complete');
		});
	});
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!

	console.log('connection open');

 	batchUpdate();

});
