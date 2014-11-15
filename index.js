
exports.compress = compress;
exports.decompress = decompress;

function with_pat (pat) {
	return function (ret, curr, i) {
		if (curr.match(pat)) ret.push(i);
		return ret;
	}
}

function decompress (attrs, keynames) {
	keynames = keynames.sort();
	var k, ks = Object.keys(attrs).sort(), ret = {}, found, i;

	while ((k = ks.pop()) != null) {
		found = keynames.reduce(with_pat(new RegExp('^' + k + '.+')), []);
		if (found.length) {
			i = found[found.length-1];
			ret[keynames[i]] = attrs[k];
			keynames.splice(i, 1);
		}
		else
			ret[k] = attrs[k];
	}

	return ret;
}

function compress (attrs, opts) {
	if (!attrs) return;
	opts || (opts = {});

	var k, v, i = 1, ret = {};
	var key, keys = Object.keys(attrs).sort();

	while ((key = keys.shift()) != null) {
		do {
			k = key.substring(0, i);
			++i;
		} while (ret.hasOwnProperty(k));

		v = attrs[key];
		if (is_array(v) && opts.stringifyArrays)
			ret[k] = v.join(',');
		else
			ret[k] = v;
		i = 1;
	}

	return opts.keysonly ? Object.keys(ret) : ret;
}

function is_array (val) {
	return Object.prototype.toString.call(val) == '[object Array]';
}

