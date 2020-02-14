const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel');

// READ PROJECTS
router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Projects.get());
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ PROJECT BY ID
router.get('/:id', async (req, res) => {
  try {
    res.status(200).json(await Projects.get(req.params.id));
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// middleware

module.exports = router;