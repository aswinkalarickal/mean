var express = require('express');
var router = express.Router();
var mongo = require('../mongo');
var util = require('../util');

// Get all tasks
router.get('/tasks', function (req, res, next) {
    mongo.find('dbTasks', function(err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get single task
router.get('/task/:id', function (req, res, next) {
    mongo.findOne('dbTasks', {_id: util.getObjectId(req.params.id)}, function(err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Save task
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else {
        mongo.save('dbTasks', task, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete task
router.delete('/task/:id', function (req, res, next) {
    mongo.remove('dbTasks', {_id: util.getObjectId(req.params.id)}, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Update task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updatedTask = {};

    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }

    if (task.title) {
        updatedTask.title = task.title;
    }

    if (!updatedTask) {
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else {
        mongo.update('dbTasks', {_id: util.getObjectId(req.params.id)}, updatedTask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;
