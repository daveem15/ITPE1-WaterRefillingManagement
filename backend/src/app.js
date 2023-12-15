const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;
const authRoute = require("./routes/auth-route");
app.use("/auth", authRoute);

const productRoute = require("./routes/product-route");
app.use("/product", productRoute);

const orderRoute = require("./routes/order-route");
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log("Server running to port:", PORT);
});
