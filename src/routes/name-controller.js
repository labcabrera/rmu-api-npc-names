const express = require('express');
const router = express.Router();

const randomNameService = require('../services/random-name-service');

router.get('/:race', async (req, res) => {
    try {
        const race = req.params.race;
        const name =  await randomNameService.getRandomName(race);
        const response = {
            name: name
        };
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    } catch (error) {
        res.status(error.status ? error.status : 500).json({ message: error.message });
    }
});

module.exports = router;