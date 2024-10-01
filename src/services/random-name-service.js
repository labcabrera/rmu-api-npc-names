const fs = require('fs');
const path = require('path');

const getRandomName = (race) => {
    const filePath = resolveRaceFile(race);
    return getRandomLine(filePath)
        .then(line => {
            return line;
        })
        .catch(error => {
            throw { status: 500, message: error.message }
        });
};

function getRandomLine(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading the file: ${err}`);
                return;
            }
            const lines = data.split(/\r?\n/);
            const nonEmptyLines = lines.filter(line => line.trim() !== '');
            if (nonEmptyLines.length === 0) {
                reject('The file is empty or has no valid lines.');
                return;
            }
            const numberOfLines = nonEmptyLines.length;
            const randomIndex = Math.floor(Math.random() * numberOfLines);
            const randomLine = nonEmptyLines[randomIndex];
            resolve(randomLine);
        });
    });
};

const resolveRaceFile = (race) => {
    //TODO
    if (race.includes('orc') || race.includes('troll')) {
        return path.join(__dirname, '../../data/names-orcs.txt');
    }
    return path.join(__dirname, '../../data/names-greek-gods.txt');
};

module.exports = {
    getRandomName
};