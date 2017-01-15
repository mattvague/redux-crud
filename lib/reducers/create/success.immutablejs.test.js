var reducer         = require('./success');
var test            = require('ava');
var fromJS          = require('immutable').fromJS;
var isImmutable     = require('../../utils/isImmutableJs');
var constants         = require('../../../constants');
var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_IMMUTABLE,
  resourceName:  'users',
}
var subject     = 'createSuccess: (immutable.js store) ';

function getCurrent() {
  return fromJS([
    {
      id: 1,
      name: 'Blue'
    },{
      id: 2,
      name: 'Red'
    }
  ]);
}

test(subject + 'it throws if it cannot find config.key', function(t) {
  var curr = getCurrent();
  var record = {};
  var config = {
    resourceName: 'users'
  }
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f, /users.createSuccess: Expected config.key/);
  
});

test(subject + 'returns an immutable collection', function(t){
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.truthy(isImmutable(updated));
  
});

test(subject + 'throws if given an array', function(t) {
  var curr    = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, /users.createSuccess: Expected record not to be an array/);
  
});

test(subject + 'adds the record', function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 3);
  
});

test(subject + 'it takes immutables', function(t) {
  var curr = getCurrent();
  var record = fromJS({
    id: 3,
    name: 'Green'
  });
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 3);
  
});

test(subject + 'merges if exists', function(t) {
  var curr = getCurrent();
  var record = {
    id: 2,
    name: 'Green'
  };
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 2);
  t.deepEqual(updated[1].id, 2);
  t.deepEqual(updated[1].name, 'Green');
  
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
    store:        constants.STORE_IMMUTABLE,
  }
  var curr = fromJS([{
    _id: 2,
    name: 'Blue'
  }]);
  var record = {
    _id: 2,
    name: 'Green'
  };
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 1);
  
});

test(subject + 'it throws when record doesnt have an id', function(t) {
  var curr = getCurrent();
  var record = {
    name: 'Green'
  };

  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f, /users.createSuccess: Expected to record to have id/);
  
});

test(subject + 'it uses the cid', function(t) {
  var cid = 'abc';
  var curr = fromJS([
    {
      id: cid,
      name: 'Blue'
    }
  ]);
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record, cid).toJS();
  t.deepEqual(updated.length, 1);
  
});

test(subject + 'removes busy and pendingCreate', function(t) {
  var curr = fromJS([{
    busy: true,
    id:   2,
    name: 'Green',
    pendingCreate: true,
  }]);
  var record  = {
    id: 2,
    name: 'Yellow'
  };
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 1);
  t.truthy(updated[0].busy == null, 'removes busy');
  t.truthy(updated[0].pendingCreate == null, 'removes pendingCreate');
  
});
