const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.route");
const employeesRoutes = require("./routes/employees.route");
const port = process.env.PORT || 3000

mongoose
  .connect(
    "mongodb+srv://Admin:32WxNNATPGg6ErHA@cluster0.amqq6.mongodb.net/ExpressTestDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", postRoutes);
    app.use("/api", usersRoutes);
    app.use("/api", employeesRoutes);

    app.listen(port, () => {
      console.log("Server has started!");
    });
  });
