/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import 'express-async-errors';
import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import RouteError from '@src/common/RouteError';
import { NodeEnvs } from '@src/common/misc';
import indexRouter from '@src/routes';

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
	app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
	app.use(helmet());
}

// Add error handler
app.use(
	(
		err: Error,
		_: Request,
		res: Response,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		next: NextFunction,
	) => {
		if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
			logger.err(err, true);
		}
		let status = HttpStatusCodes.BAD_REQUEST;
		if (err instanceof RouteError) {
			status = err.status;
		}
		return res.status(status).json({ error: err.message });
	},
);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.use('/', indexRouter);

// Catch missing routes and forward to error handler
app.use('/*', (_: Request, res: Response) => {
	res.json({ status: 'ERR', message: 'Page not found' });
});

// **** Export default **** //

export default app;
