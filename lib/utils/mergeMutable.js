var forEach   = require('lodash.foreach');
var keyBy     = require('lodash.keyby');
var assign    = require('lodash.assign');
var wrapArray = require('./wrapArray')

function mergeMutable (current, records, key) {
  return assign(curent, keyBy(records, r => r[key]))
  //var newRecords = current.slice(0);

  //forEach(current, function (record, index) {
    //var recordKey = record[key];
    //if (recordKey == null) throw new Error('Expected record to have ' + key);
    //recordMap[recordKey] = record;
    //indexMap[recordKey] = index;
  //});

  //forEach(records, function (record, index) {
    //var recordId = record[key]
    //if (recordMap[recordId]) {
      //newRecords[indexMap[recordId]] = record;
    //} else {
      //indexMap[recordId] = newRecords.length;
      //newRecords.push(record);
    //}
    //recordMap[recordId] = record;
  //});

  //return newRecords;
}

module.exports = mergeMutable;
