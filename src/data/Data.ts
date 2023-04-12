import axios from 'axios';

const URL = 'https://rattle-elfin-emperor.glitch.me';

interface Data {
    name: string;
    value: number;
    rank: number;
}

async function getScoreData(): Promise<Data[]> {
    const url = `${URL}/data`;

    try {
        const response = await axios.get<Data[]>(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

interface ScoreData {
    score: number;
    name: string;
}
async function postScore(scoreData: ScoreData): Promise<boolean> {
    const url = `${URL}/score`;

    try {
        const response = await axios.post(url, scoreData);
        return response.data.success === true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {
    getScoreData,
    postScore
};

export type {
    Data,
    ScoreData
};
