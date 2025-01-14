import fs from "fs";
import path from "path";
import morgan from "morgan";

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../logs/access.log'),
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