const express = require('express');
const cors = require('cors');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3007;

const openapiFilePath = path.join(__dirname, '../openapi.yaml');
const openapiFile = fs.readFileSync(openapiFilePath, 'utf8')
const swaggerDocument = yaml.parse(openapiFile);

app.use(express.json());
app.use(cors());

const nameRouter = require('./routes/name-controller');

app.use('/v1/random-names', nameRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use((req, res, next) => {
  res.status(404).json({ code: "400", message: "Invalid path", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: "500", message: "Internal server error", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API started on ${PORT}`);
});