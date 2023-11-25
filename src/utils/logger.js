import winston from 'winston';
import { createLogger, format, transports } from "winston";
import {__dirname} from '../utils.js'
import config from '../../config.js';


const { combine, printf, timestamp, colorize } = format;

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}

const colors = {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'green',
    http: 'white',
    debug: 'black'
}

const envLevel = config.NODE_ENV === 'production' ? 'info' : 'debug';

const logConfig = {

    levels: levels,

    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss',
        }),
        colorize( {colors: colors} ),
        printf( (info) => `${info.level} | ${info.timestamp} | ${info.message}` )
    ),


    transports: [
        new winston.transports.File({
            filename: __dirname + '/logs/errors.log',
            level: 'error'
        }),

        new winston.transports.Console({level: envLevel}),
    ]
};

export const logger = winston.createLogger(logConfig);

