const express = require("express");
const cors = require("cors");
const { postgrator } = require("./lib/db");
const petsRouter = require("./routes/pets");
const usersRouter = require("./routes/users");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/pets", petsRouter);
app.use("/users", usersRouter);

const port = 5500;

postgrator
  .migrate()
  .then((result) => {
    console.log("success" + result);
    app.listen(port, () => {
      console.log(`GetRexi is on!`);
    });
  })
  .catch((err) => console.log(err));
