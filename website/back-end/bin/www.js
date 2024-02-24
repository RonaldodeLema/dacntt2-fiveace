#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js';
import debugModule from 'debug';
import { createServer } from 'http';
import connect2db from '../database/connect2db.js';
import session from 'express-session';
import 'dotenv/config';

const debug = debugModule('caws-v3:server');

/**
 * Get port from environment and store in Express.
 */
connect2db.conn();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SECRET_SS,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') throw error;


  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
