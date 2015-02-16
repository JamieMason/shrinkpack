module.exports = function(object, fn) {

  var is = require('is');

  function iterator(value, chain) {

    fn(value, chain);

    if (is.object(value)) {
      Object.keys(value).forEach(function(key) {
        iterator(value[key], chain.concat(key));
      });
    }

  }

  return iterator(object, []);

};
