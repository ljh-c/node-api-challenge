const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');

// READ ACTIONS

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Actions.get());
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ACTION BY ID

router.get('/:id', validateActionId, (req, res) => {
  try {
    res.status(200).json(req.action);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ACTION

router.delete('/:id', validateActionId, async (req, res) => {
  try {
    await Actions.remove(req.action.id);
    res.sendStatus(200);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ACTION

router.put('/:id', validateActionId, async (req, res) => {
  try {
    res.status(200).json(await Actions.update(req.action.id, req.body));
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// middleware

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);

    if (action === null) {
      res.status(400).json({ message: "Invalid action id." })
    } else {
      req.action = action;
      next();
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = router;