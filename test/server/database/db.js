import mongoose from "mongoose";

let DB_URI = 'mongodb://127.0.0.1:27017/outboxeduhackathonii'

function connect() {
  return new Promise((resolve, reject) => {
    //Connect to the database then resolve the promise
    const conn = mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      .then((res, err) => {
        if (err) return reject(err);
        console.log(`Database online on ${DB_URI}`);

        resolve();
      });
  });
}

function close() {
  console.log("Database gone offline");
  return mongoose.disconnect();
}
export default { connect, close };


