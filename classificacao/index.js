require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const { MSS_CLASSIFICACAO_PORTA } = process.env;

const palavraChave = "importante";
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = observacao.texto.includes(palavraChave)
            ? "importante"
            : "comum";
        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    },
};
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
        res.status(200).send({ msg: "ok" });
    } catch (e) {}
});

app.listen(MSS_CLASSIFICACAO_PORTA, () =>
    console.log(`Classificação. ${MSS_CLASSIFICACAO_PORTA}`)
);
