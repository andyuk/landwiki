
exports.index = function(req, res){
  var url = 'http://land-wiki.wikispaces.com/';
  res.redirect(url, 307); // temporary redirect
  // res.render('index', { title: 'Express' });
};

exports.map = function(req, res){
  // var url = 'http://land-wiki.wikispaces.com/';
  // res.redirect(url, 307); // temporary redirect
  res.render('index', { title: 'Land Wiki' });
};

exports.test = function(req, res){
  res.render('test', { title: 'Land Wiki' });
};