require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const app = express();

app.use(express.json());

const observacoesPorLembreteId = {};

app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/lembretes/:id/observacoes", async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ObservacaoCriada",
        dados: { id: idObs, texto, lembreteId: req.params.id },
    });
    res.status(201).send(observacoesDoLembrete);
});

app.post("/eventos", (req, res) => {
    res.status(200).send({ msg: "ok" });
});

const { MSS_OBSERVACOES_PORTA } = process.env;
app.listen(MSS_OBSERVACOES_PORTA, () =>
    console.log(`Observacoes. ${MSS_OBSERVACOES_PORTA}`)
);
