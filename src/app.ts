import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import * as path from 'path';
import nameRouter from './routes/name-controller';

const app: Application = express();

const PORT: number = parseInt(process.env.PORT || '3007', 10);

const openapiFilePath: string = path.join(__dirname, '../openapi.yaml');
const openapiFile: string = readFileSync(openapiFilePath, 'utf8');
const swaggerDocument = yaml.parse(openapiFile);

app.use(express.json());
app.use(cors());

app.use('/v1/random-names', nameRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response): void => {
    res.redirect('/api-docs');
});

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({ 
        code: "404", 
        message: "Invalid path", 
        timestamp: new Date().toISOString() 
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ 
        code: "500", 
        message: "Internal server error", 
        timestamp: new Date().toISOString() 
    });
});

app.listen(PORT, (): void => {
    console.log(`API started on ${PORT}`);
});
