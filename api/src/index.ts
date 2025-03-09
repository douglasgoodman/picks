import bodyParser from 'body-parser';
import session from 'cookie-session';
import express from 'express';
import morgan from 'morgan';
import { addAuthRouter } from './auth/authRouter.js';
import { config } from './config.js';
import { addEspnRouter } from './espn/espnRouter.js';
import { addLeagueRouter } from './league/leagueRouter.js';
import { addPicksRouter } from './picks/picksRouter.js';
import { getSeasonDocument } from './services/storageService.js';
import { addTeamRouter } from './team/teamRouter.js';
import { addUserRouter } from './user/userRouter.js';

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
addTeamRouter(app);
addEspnRouter(app);
addPicksRouter(app);

app.get('/hi', (_, res) => {
    res.send('hello!!');
});

app.listen(config.port, () => {
    console.log(`Example app listening https://localhost:${config.port}`);
});
