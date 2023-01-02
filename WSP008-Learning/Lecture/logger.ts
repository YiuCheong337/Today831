import winston from 'winston'

// Format specification
const logFormat = winston.format.printf(function (info) {
	let date = new Date().toISOString()
	return `${date}[${info.level}]: ${info.message}\n`
})

// logger specification
export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(winston.format.colorize(), logFormat),
	transports: [new winston.transports.Console()]
})
