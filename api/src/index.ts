import express from 'express';
import session from 'cookie-session';
import { addAuthRouter } from './auth/authRouter.js';
import { getSeasonDocument } from './services/storageService.js';
import { config } from './config.js';
import { addUserRouter } from './user/userRouter.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { addLeagueRouter } from './league/leagueRouter.js';

const app = express();
app.set('trust proxy', true);

app.use(morgan('tiny'));

app.use(bodyParser.json());

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);

app.use(
    session({
        secret: config.session.secret,
        expires,
    }),
);

app.get('/schedule', async (_req, res) => {
    const doc = await getSeasonDocument();
    res.json(doc);
});

addAuthRouter(app);
addUserRouter(app);
addLeagueRouter(app);

app.get('/hi', (_, res) => {
    res.send('hello!!');
});

app.listen(config.port, () => {
    console.log(`Example app listening https://localhost:${config.port}`);
});
