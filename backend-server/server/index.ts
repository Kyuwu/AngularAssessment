import express, { Express } from 'express';
import {config as configureEnv} from 'dotenv';
import {verbose} from "sqlite3";
import {registerRoutes} from "./controller";
import cors from 'cors';

/**
 * Edits in this file should not be necessary
 */

configureEnv();

const app: Express = express();
const port = Number(process.env.PORT) || 8080;

const sqlite3 = verbose();
const db = new sqlite3.Database('./server/db/chinook.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
    startServer()
});

function startServer() {
    app.use(cors())
    registerRoutes(app, db)

    app.listen(port, () => {
        console.log(`API is running at http://localhost:${port}`);
    });
}




