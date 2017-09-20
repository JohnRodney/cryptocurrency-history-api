import express from 'express';
import routesHash from './settings/routes';
import port from './settings/port';

const app = express();
const router = express.Router();

Object.keys(routeHash).forEach(route => router.get(route, routeHash[route]));

app.use(router);
app.listen(port);
