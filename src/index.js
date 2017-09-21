import express from 'express';
import routesHash from './settings/routes';
import port from './settings/port';

const app = express();
const router = express.Router();

Object.keys(routesHash).forEach(route => router.get(route, routesHash[route]));

app.use(router);
app.listen(port);

process.on('SIGTERM', e => process.exit(0));
