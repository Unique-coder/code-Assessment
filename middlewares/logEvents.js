import { format } from "date-fns";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd \t HH:mm:ss")}`;
  const logItem = `${dateTime} \t ${message} \n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    error;
  }
};
export const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t ${req.headers.origin}\t ${req.url}`,
    "requests.log"
  );
  // (req.method, req.path);
  next();
};

export const handleError = (error, req, res, next) => {
  logEvents(`${error.name}: ${error.message}`, "error.log");
  error.stack;
  res.status(500).send("Something broke!");
};
