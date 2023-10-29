import fs from 'fs';

export const readJsonFile = (filePath, defaultData = []) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            return resolve(defaultData);
        }

        fs.readFile(filePath, 'utf8', (err, json) => {
            if (err) return reject(err);
            if (!json.trim()) return resolve(defaultData);

            try {
                const data = JSON.parse(json);
                return resolve(data);
            } catch (parseErr) {
                return reject(parseErr);
            }
        });
    });
};

export const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
