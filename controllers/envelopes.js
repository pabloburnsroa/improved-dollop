const dbEnvelopes = require('../models/db');
const { createId } = require('../helpers/dbHelpers');

/*
TODO: Remove any reused code and create helper functions 
TODO: Error checking
*/

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
    return res.status(201).send(newEnvelope);
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
    return res.status(201).send(envelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteEnvelope = async (req, res, next) => {
  try {
    const { id } = req.params;
    const envelopes = await dbEnvelopes;
    // Find envelope with ID
    const envelope = envelopes.find((e) => e.id === parseInt(id));
    // Update envelopes array w/o envelope
    const updatedEnvelopes = envelopes.filter((e) => e.id != envelope.id);
    return res.status(204).send(updatedEnvelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.transfer = async (req, res, next) => {
  try {
    // Grab IDs from path
    const { fromId, toId } = req.params;
    // Grab amount to be transferred from req.body
    const { amount } = req.body;

    const envelopes = await dbEnvelopes;
    // Retrive fromEnvelope and toEnvelope
    const transferFrom = envelopes.find((e) => e.id === parseInt(fromId));
    const transferTo = envelopes.find((e) => e.id === parseInt(toId));

    /*
    Error checking: is transfer amount larger than balance of origin envelope
    */

    if (transferFrom.budget < amount) {
      console.log(transferFrom.budget);
      return res.status(404).send({
        message: 'Amount to be transferred exceeds the envelope budget',
      });
    }

    transferFrom.budget -= amount;
    transferTo.budget += amount;

    return res.status(201).send(transferFrom);
  } catch (err) {
    res.status(500).send(err);
  }
};
