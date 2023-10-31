import fs from 'fs';

export const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
            resolve([]);
        } else {
            fs.readFile(filePath, 'utf8', (err, json) => {
                if (err) return reject(err);

                try {
                    const data = JSON.parse(json);
                    if (!Array.isArray(data)) {
                        return reject(new Error("The JSON file does not contain an array"));
                    }
                    return resolve(data);
                } catch (parseErr) {
                    return reject(parseErr);
                }
            });
        }
    });
};

export const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (readErr, json) => {
            if (readErr && readErr.code !== 'ENOENT')
                return reject(readErr);

            let currentData = [];
            if (json && json.trim()) { // check for a non-empty file
                try {
                    currentData = JSON.parse(json);
                    if (!Array.isArray(currentData)) {
                        return reject(new Error("The JSON file does not contain an array"));
                    }
                } catch (parseErr) {
                    return reject(parseErr);
                }
            }

            currentData = data;
            if (!Array.isArray(currentData))
                return reject(new Error("The input into the file must be an array. Unacceptable state"));


            const jsonData = JSON.stringify(currentData, null, 2);
            fs.writeFile(filePath, jsonData, 'utf8', (writeErr) => {
                if (writeErr)
                    return reject(writeErr);
                resolve();
            });
        });
    });
};