var assign            = require('lodash.assign');
var common            = require('../common');
var siu               = require('siu');
var fromJS            = require('immutable').fromJS;
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  // mark record as unsaved and busy
  var recordStatus = {
    busy:          true,
    pendingUpdate: true,
  };

  // replace record
  switch(config.store) {
    case constants.STORE_MUTABLE:
      return mergeMutable(current, assign({}, record, recordStatus), config.key);
    case constants.STORE_IMMUTABLE:
      return fromJS(mergeMutable(current, assign({}, record, recordStatus), config.key));
    default:
      return siu.a.merge(current, record.merge(recordStatus), config.key);
  }

}

module.exports = start;
