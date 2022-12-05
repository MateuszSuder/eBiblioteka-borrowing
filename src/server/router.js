import express from "express";
import fs from "fs/promises";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const folderRegex = new RegExp("^\\w+[^.]$", "g");
const fileRegex = new RegExp(/\w+.js/);

const slicePath = (path, search) => {
    const index = path.search(search);
    return `.${path}`.slice(index);
}

const relativePath = (path, file) => {
    const sliced = slicePath(`${path}/${file}`, "routes");
    return `.${sliced}`;
};

const initEP = async (path) => {
    const files = await fs.readdir(path);

    for(const file of files) {
        if(folderRegex.test(file)) {
            await initEP(`${path}/${file}`);
        } else {
            if(fileRegex.test(file)) {
                const finalPath = relativePath(path, file);
                const epPath = path.slice(path.search("/routes") + "/routes".length);

                const { default: module } = await import(finalPath);
                app.use(`${epPath}`, module);
            }
        }
    }
}

(async () => {
    await initEP(`${__dirname}/routes`);
})();


export default app;