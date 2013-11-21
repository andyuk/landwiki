exports.render = function(view) {
  return function(req, res){
    res.render(view);
  }
};