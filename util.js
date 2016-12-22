var mongojs = require('mongojs');

module.exports = {

    getObjectId: function(id) {
        return mongojs.ObjectID(id);
    }

};
