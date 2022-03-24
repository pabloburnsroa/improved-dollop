const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Budget App',
      version: '1.0.0',
      description:
        'Simple backend API to manage budgets using the envelope budgeting method',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
  },
  apis: ['./routes/envelopes.js'],
};

const openapiSpecification = swaggerJSDoc(options);

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(openapiSpecification, {
    explorer: true,
  })
);

module.exports = router;
