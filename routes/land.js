var Land = require('../lib/models/land').model;

function toKeyValuePairs(inputObject) {
  var outputArray = [];
  for (var prop in inputObject){
    if (inputObject.hasOwnProperty(prop)){
      outputArray.push({
        'key' : prop,
        'value' : inputObject[prop]
       });
    }
  }
  return outputArray;
};

exports.add = function(req, res){
  res.render('land-form', { title: 'Land Wiki' });
};

exports.detail = function(req, res){

  var id = req.param('id');
  if (! id)
    return res.send(404);

  Land.findById(id, function(err, doc) {
    if (err)
      return res.send(404);

    var data = {
      title: doc.title,
      dataItems: toKeyValuePairs(doc.originalData)
    };
    res.render('land', data);
  });

  // var data = { 
  //   title: 'Express 3 '+ req.param('id'),
  //   dataItems: [
  //     {
  //       key: 'keyy!!',
  //       value: 'foo!!'
  //     }
  //   ]
  
};