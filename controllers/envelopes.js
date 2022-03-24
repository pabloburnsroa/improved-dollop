const dbEnvelopes = require('../models/db');
const { createId } = require('../helpers/dbHelpers');

exports.getEnvelopes = async (req, res, next) => {
  try {
    const envelopes = await dbEnvelopes;
    res.status(200).send(envelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addEnvelope = async (req, res, next) => {
  try {
    // Grab data from req.body
    const { title, budget } = req.body;
    // Grab current envelopes from mock DB
    const envelopes = await dbEnvelopes;
    // Create id for new envelope
    const newId = await createId(envelopes);
    // Create new envelope object
    const newEnvelope = {
      id: newId,
      title: title,
      budget: budget,
    };
    // Push new envelope to envelopes DB
    envelopes.push(newEnvelope);
    // Success code 201 as per docs in routes/envelopes.js
    res.status(201).send(newEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

/*
Function: Update Envelope
TODO: Add error checking
*/
exports.updateEnvelope = async (req, res, next) => {
  try {
    // Grab params and body from path
    const { id } = req.params;
    const { title, budget } = req.body;
    // Grab envelopes
    const envelopes = await dbEnvelopes;
    // Find envelope with ID
    const envelope = envelopes.find((e) => e.id === parseInt(id));
    // Update envelope
    envelope.title = title;
    envelope.budget = budget;
    res.status(201).send(envelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteEnvelope = async (req, res, next) => {
  try {
    const { id } = req.params;
    const envelopes = await dbEnvelopes;
  } catch (err) {
    res.status;
  }
};
