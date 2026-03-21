import express, { Request, Response, Router } from 'express';
import { getRandomName } from '../services/random-name-service';

const router: Router = express.Router();

interface NameResponse {
    name: string;
}

interface ErrorResponse {
    message: string;
}

router.get('', async (req: Request, res: Response): Promise<void> => {
    try {
        const race: string = req.query.race ? req.query.race as string : 'generic';
        const gender: string = req.query.gender ? req.query.gender as string : 'male';
        const name: string = await getRandomName(race, gender);
        const response: NameResponse = {
            name: name
        };
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    } catch (error: any) {
        const errorResponse: ErrorResponse = { message: error.message };
        res.status(error.status ? error.status : 500).json(errorResponse);
    }
});

export default router;
