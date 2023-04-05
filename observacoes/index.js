require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());

const observacoesPorLembreteId = {};

app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorLembreteId);
});

app.post("/lembretes/:id/observacoes", (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

const { MSS_OBSERVACOES_PORTA } = process.env;
app.listen(MSS_OBSERVACOES_PORTA, () =>
    console.log(`Observacoes. ${MSS_OBSERVACOES_PORTA}`)
);
