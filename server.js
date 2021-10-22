const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const DB = process.env.databaseURL || "mongodb+srv://muthuraj:hComb$21@cluster0.bc2d5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        /*         useCreateIndex: true,
                useFindAndModify: false, */
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log("connection successfull");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
