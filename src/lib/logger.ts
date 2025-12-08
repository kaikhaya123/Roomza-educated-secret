/**
 * Production-ready logger utility
 * Environment-based logging with different levels for dev/prod
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
}

const isDevelopment = process.env.NODE_ENV === 'development';
const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const COLORS = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m',  // Green
  warn: '\x1b[33m',  // Yellow
  error: '\x1b[31m', // Red
  reset: '\x1b[0m',
};

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[logLevel as LogLevel];
}

function formatLog(entry: LogEntry): string {
  const color = isDevelopment ? COLORS[entry.level] : '';
  const reset = isDevelopment ? COLORS.reset : '';
  const timestamp = entry.timestamp;
  const levelUpper = entry.level.toUpperCase().padEnd(5);
  
  let message = `${timestamp} [${levelUpper}] ${entry.category}: ${entry.message}`;
  
  if (entry.data && Object.keys(entry.data).length > 0) {
    message += ` ${JSON.stringify(entry.data)}`;
  }
  
  return isDevelopment ? `${color}${message}${reset}` : message;
}

function log(level: LogLevel, category: string, message: string, data?: any): void {
  if (!shouldLog(level)) return;
  
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    category,
    message,
    data,
  };
  
  const formatted = formatLog(entry);
  
  if (level === 'error') {
    console.error(formatted);
  } else if (level === 'warn') {
    console.warn(formatted);
  } else {
    console.log(formatted);
  }
}

export const logger = {
  debug: (category: string, message: string, data?: any) => 
    log('debug', category, message, data),
  info: (category: string, message: string, data?: any) => 
    log('info', category, message, data),
  warn: (category: string, message: string, data?: any) => 
    log('warn', category, message, data),
  error: (category: string, message: string, data?: any) => 
    log('error', category, message, data),
};

export default logger;
