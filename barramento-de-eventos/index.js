const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/eventos", (req, res) => {
    const evento = req.body;

    axios.post("http://localhost:4000/eventos", evento);

    axios.post("http://localhost:5000/eventos", evento);

    res.status(200).send({ msg: "ok" });
});

app.listen(10000, () => console.log("Barramento. 10000"));
