import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

const { combine, timestamp, errors, json } = format;

// Create the logger instance
export const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // Enable stack trace logging for errors
        json() // Output logs in JSON format
    ),
    transports: [
        new transports.Console(),
        new (transports as any).DailyRotateFile({
            filename: path.join(__dirname, '../../logs/error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            format: json() // Output error logs in JSON format
        }),
        new (transports as any).DailyRotateFile({
            filename: path.join(__dirname, '../../logs/combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            format: json() // Output combined logs in JSON format
        }),
    ],
});
