const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

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
router.get('/:id', validateProjectId, (req, res) => {
  try {
    res.status(200).json(req.project);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// ADD PROJECT

router.post('/', async (req, res) => {
  try {
    res.status(201).json(await Projects.insert(req.body));
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE PROJECT

router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    await Projects.remove(req.project.id);
    res.sendStatus(200);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PROJECT

router.put('/:id', validateProjectId, async (req, res) => {
  try {
    const updatedProject = await Projects.update(req.project.id, req.body);
    res.status(200).json(updatedProject);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ACTIONS FOR A PROJECT
router.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    res.status(200).json(await Projects.getProjectActions(req.params.id));
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD ACTION FOR A PROJECT

router.post('/:id/actions', validateProjectId, async (req, res) => {
  try {
    req.body.project_id = req.project.id;

    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
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
      res.status(400).json({ message: "Invalid project id." })
    } else {
      req.project = project;
      next();
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = router;