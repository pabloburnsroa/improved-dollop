const express = require('express');
const router = express.Router();

const {
  getEnvelopes,
  addEnvelope,
  updateEnvelope,
  getEnvelopeById,
  deleteEnvelope,
  transfer,
} = require('../controllers/envelopes');

/**
 * @openapi
 * components:
 *   schemas:
 *     Envelope:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - budget
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a budget envelope
 *         title:
 *           type: string
 *           description: Title of envelope
 *         budget:
 *           type: integer
 *           description: The value of the envelope budget
 *       example:
 *         id: 1
 *         title: Entertainment
 *         budget: 250
 */

/**
 * @openapi
 *  tags:
 *    name: Envelopes
 *    description: Store budgets
 */

/**
 * @openapi
 * /api/v1/envelopes:
 *  summary: Get all of the envelopes data
 *  description: This path is used to retrieve envelopes data from the db.js file
 *  get:
 *     summary: Returns all envelopes
 *     tags: [Envelopes]
 *     responses:
 *       200:
 *         description: Returns a list of all envelopes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Envelope'
 */
router.get('/', getEnvelopes);

/**
 * @openapi
 * /api/v1/envelopes:
 *   summary: Create a new envelope
 *   description: Path is used to create a new envelope
 *   post:
 *     summary: Create new envelope
 *     tags: [Envelopes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               budget:
 *                 type: integer
 *             example:
 *               title: Entertainment
 *               budget: 500
 *     responses:
 *       201:
 *         description: The envelope was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envelope'
 *       500:
 *         description: Internal server error
 */
router.post('/', addEnvelope);

/**
 * @openapi
 * /api/v1/envelopes/{id}:
 *   put:
 *     summary: Update envelope
 *     tags: [Envelopes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: envelope ID
 *         type: integer
 *         required: true
 *         example: 1
 *     requestBody:
 *       description: data for updated envelope
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               budget:
 *                 type: integer
 *             example:
 *               title: Mortage/Rent
 *               budget: 800
 *     responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 *
 *
 */
router.put('/:id', updateEnvelope);

/**
 * @openapi
 * /api/v1/envelopes/{id}:
 *   delete:
 *     summary: Deletes an envelope
 *     tags: [Envelopes]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Envelope ID to delete
 *         type: integer
 *         required: true
 *         example: 1
 *     responses:
 *       "204":
 *         description: Envelope deleted
 *       "500":
 *         description: Internal server error
 *       "404":
 *         description: Envelope not found
 */
router.delete('/:id', deleteEnvelope);

module.exports = router;
