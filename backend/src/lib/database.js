const mongoose = require("mongoose");

const DbRetryConnTimeMS = 10000;
const DbRetryConnMaxRetries = 5;

let retryTimes = 0;

module.exports = (config) => {
    const {port, username, password, host, name, authSrc} = config.database
    const mongoURI = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=${authSrc}`
    mongoose.set("strictQuery", true)
    mongoose.connect(
        mongoURI,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        },
        (err) => {
        if (err) {
            console.log(`Database connection error: ${err}`);


            if (
            DbRetryConnMaxRetries !== 0 &&
            retryTimes >= DbRetryConnMaxRetries
            ) {
            return;
            }

            retryTimes++;
            setTimeout(() => connect(dbConfig), DbRetryConnTimeMS);
        } else {
            console.log(`Established connection with: ${name}`);
        }
        },
  );
}
