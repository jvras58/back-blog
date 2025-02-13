import fs from "fs";
import path from "path";
import morgan from "morgan";

const logsDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
);

const errorLogFilter = (_req: any, res: any) => {
    return res.statusCode >= 400;
};

export const errorLogger = morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => !errorLogFilter(req, res)
});

export const developmentLogger = morgan('dev');