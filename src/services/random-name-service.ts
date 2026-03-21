import { promises as fs } from 'fs';
import * as path from 'path';

interface RandomNameError {
    status: number;
    message: string;
}

export const getRandomName = async (race: string, gender: string): Promise<string> => {
    try {
        const filePath = resolveRaceFile(race, gender);
        const line = await getRandomLine(filePath);
        return line;
    } catch (error) {
        const err = error as Error;
        throw { status: 500, message: err.message } as RandomNameError;
    }
};

const getRandomLine = async (file: string): Promise<string> => {
    try {
        const data = await fs.readFile(file, 'utf8');
        const lines = data.split(/\r?\n/);
        const nonEmptyLines = lines.filter(line => line.trim() !== '');
        
        if (nonEmptyLines.length === 0) {
            throw new Error('The file is empty or has no valid lines.');
        }
        
        const numberOfLines = nonEmptyLines.length;
        const randomIndex = Math.floor(Math.random() * numberOfLines);
        const randomLine = nonEmptyLines[randomIndex];
        
        return randomLine;
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error reading the file: ${err.message}`);
    }
};

const resolveRaceFile = (race: string, gender: string): string => {
    const check = race ? race.toLowerCase() : 'generic';
    const genderCheck = gender ? gender.toLowerCase() : 'male';
    let filePath: string = '../../data/names-greek-gods.txt';
    if (check.includes('orc') || check.includes('troll')) {
        filePath = '../../data/names-orcs.txt';
    } else if (check.includes('elf')) {
        filePath = genderCheck === 'male' ? '../../data/names-sindar-male.txt' : '../../data/names-sindar-female.txt';
    } else if (check.includes('halfling')) {
        filePath = '../../data/names-hobbits-surnames.txt';
    }
    return path.join(__dirname, filePath);
};
