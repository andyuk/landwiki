var express = require('express'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose');
	config = require('../config.json'),
	csv = require('csv'),
  fs = require('fs'),
	Land = require('../lib/models/land').model;

var MONGO_URI = (process.env.MONGOHQ_URL || config.mongo.uri);

var outputFile = 'dump.csv';

mongoose.connect(MONGO_URI, function(err) {
  if (err) throw err;

  var columns = [
    'id',
    'latitude',
    'longitude',
    'title',
    'icon'
  ];
  var rowCount = 0;

	csv()
	.from(Land.find().stream())
  .transform(function(data, index){
    //console.log('data', data._id.toString());
    rowCount++;
    return [
      data._id.toString(), 
      data.latitude, 
      data.longitude,
      data.title,
      data.icon
      //data.area
    ];
  })
  .to.stream(fs.createWriteStream(outputFile), {
    columns: columns,
    header: true
  })
	.on('end', function(){ 
		console.log('Exported %s rows to %s', rowCount, outputFile);
		process.exit();
	});

});
