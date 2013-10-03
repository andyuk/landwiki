
exports.index = function(req, res){
  var url = 'http://blog.landwiki.org.uk/';
  res.redirect(url, 307); // temporary redirect
};

exports.map = function(req, res){
  res.render('index', { title: 'Land Wiki' });
};

exports.test = function(req, res){
  res.render('test', { title: 'Land Wiki' });
};