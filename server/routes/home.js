const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  // res.send('hi');
  res.render('index', {
    title: 'My express app',
    header: 'Hello'
  })
});

module.exports = router;
