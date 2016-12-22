var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.MONGODB_URL);

var COLLECTIONS = {
    dbTasks: {
        db: 'Tasks',
        indexes: []
    }
};

for(var key in COLLECTIONS) {
    var collection = COLLECTIONS[key];
    if(collection.indexes.length > 0) {
        db.collection(collection.db).ensureIndex(collection.indexes);
    }
}

module.exports = {

    find: function(collectionName, callback) {
        db.collection(COLLECTIONS[collectionName].db).find(callback);
    },

    findOne: function(collectionName, params, callback) {
        db.collection(COLLECTIONS[collectionName].db).findOne(params, callback);
    },

    save: function(collectionName, data, callback) {
        db.collection(COLLECTIONS[collectionName].db).save(data, callback);
    },

    remove: function(collectionName, params, callback) {
        db.collection(COLLECTIONS[collectionName].db).remove(params, callback);
    },

    update: function(collectionName, params, data, options, callback) {
        db.collection(COLLECTIONS[collectionName].db).update(params, data, options, callback);
    }

};
