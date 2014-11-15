var m = require('..');

describe('mengene', function () {
  it('should compress', function (done) {
    m.compress({'ahmet': 1, 'mehmet': 2, 'mahmut': 3})
    .should.eql({'a': 1, 'me': 2, 'm': 3});
    done();
  });
  it('should compress and stringify arrays', function (done) {
    m.compress({'ahmet': 1, 'mehmet': 2, 'mahmut': 3, 'yavuz': ['foo', 'bar']}, 
      {stringifyArrays: true})
    .should.eql({'a': 1, 'me': 2, 'm': 3, 'y': 'foo,bar'});
    done();
  });
  it('should compress and return keys only', function (done) {
    m.compress({'ahmet': 1, 'mehmet': 2, 'mahmut': 3}, {keysonly: true})
    .should.eql(['a', 'm', 'me']);
    done();
  });
  it('should decompress', function (done) {
    m.decompress({'a': 1, 'me': 2, 'm': 3}, ['mehmet', 'mahmut', 'ahmet'])
    .should.eql({'ahmet': 1, 'mehmet': 2, 'mahmut': 3});
    done();
  });
})