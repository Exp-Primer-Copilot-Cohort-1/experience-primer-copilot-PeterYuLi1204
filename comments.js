// Create web server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Load comments.json
var commentsPath = path.join(__dirname, '..', 'data', 'comments.json');
var comments = require(commentsPath);

// GET /comments
router.get('/', function(req, res, next) {
  res.json(comments);
});

// POST /comments
router.post('/', function(req, res, next) {
  var comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);

  // Update comments.json
  fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
    if (err) {
      return next(err);
    }

    res.status(201).json(comment);
  });
});

module.exports = router;
