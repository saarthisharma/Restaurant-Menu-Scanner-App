const {createLogger,transports,format} = require("winston")
const logger = createLogger({
    transports:[
        new transports.File({
            filename: "../logs/logMessage.log",
            level: 'error',
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
});

// logger.info("a testing message")

module.exports = logger   