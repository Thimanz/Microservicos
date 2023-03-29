require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const lembretes = {};
let idAtual = 0;

//GET localhost:400/lembretes
app.get("/lembretes", (req, res) => {
    res.send(lembretes);
});

//POST localhost:400/lembretes
app.post("/lembretes", (req, res) => {
    idAtual++;
    const { texto } = req.body;
    lembretes[idAtual] = {
        id: idAtual,
        texto,
    };
    res.status(201).send(lembretes[idAtual]);
});

const { MSS_LEMBRETES_PORTA } = process.env;
app.listen(MSS_LEMBRETES_PORTA, () => {
    console.log(`Lembretes. Porta ${MSS_LEMBRETES_PORTA}`);
});
