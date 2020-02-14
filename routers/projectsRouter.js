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
router.get('/:id', validateProjectId, async (req, res) => {
  try {
    res.status(200).json(await Projects.get(req.params.id));
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// READ ACTIONS FOR A PROJECT
router.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    res.status(200).json(await Projects.getProjectActions(req.params.id));
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// middleware

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);

    if (project === null) {
      res.status(400).json({ message: "Invalid project id. "})
    } else {
      req.project = project;
      next();
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

  Projects.get(req.params.id);
}

module.exports = router;