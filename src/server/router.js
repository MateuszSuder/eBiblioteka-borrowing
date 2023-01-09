import express from "express";
import fs from "fs/promises";
import {dirname} from "path";
import {fileURLToPath} from "url";
import cookieParser from "cookie-parser";

const app = express.Router();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`${req.method}::${req.path}`);
    next();
})

const __dirname = dirname(fileURLToPath(import.meta.url));
const folderRegex = new RegExp(/^{?[\w|-]+[^.]}?$/);
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
        if(folderRegex.test(`${file}`)) {
            await initEP(`${path}/${file}`);
        } else {
            if(fileRegex.test(file)) {
                const finalPath = relativePath(path, file);
                const epPath = path.slice(path.search("/routes") + "/routes".length).replaceAll("{", ":").replaceAll("}", "");

                const { default: module } = await import(finalPath);
                for(const layer of module.stack) {
                    console.log(`Path: [${Object.keys(layer.route.methods)[0]}] ${epPath}${layer.route.path}`);
                }
                app.use(`${epPath}`, module);
            }
        }
    }
}

(async () => {
    await initEP(`${__dirname}/routes`);
})();


export default app;