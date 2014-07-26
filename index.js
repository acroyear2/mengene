
var _ = require('underscore');

exports.unmangle = unmangle;
exports.mangle = mangle;

function unmangle (attrs, keys) {
  if (!attrs || !keys)
    return;
  keys = _.clone(keys).sort();
  if (keys.length > 0) {
    var mk, p, amk = _.keys(attrs).sort(), ret = {};
    while ((mk = amk.shift()) != null) {
      p = new RegExp('^' + mk + '.+');
      ret[_.find(keys, function (key, index) {
        if (key.match(p))
          return keys.splice(index, 1)[0];
      }) || mk] = attrs[mk];
    }
    return ret;
  }
}

function mangle (attrs, options) {
  if (!attrs)
    return;
  options || (options = {});
  var k, v, i = 1, ret = {};
  var key, keys = _.keys(attrs).sort();
  while ((key = keys.shift()) != null) {
    do {
      k = key.substring(0, i);
      i++;
    } while (ret.hasOwnProperty(k));

    v = attrs[key];
    if (_.isArray(v) && options.stringifyArrays)
      ret[k] = v.join(',');
    else
      ret[k] = v;
    i = 1;
  }
  return options.keysonly ? _.keys(ret).sort() : ret;
}
