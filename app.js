const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const TOTAL_CG = 20;
const TOTAL_CE = 30;

function calcularNotas(cg, ce) {
  let notaCG = (cg * 10) / TOTAL_CG;
  let notaCE = (ce * 10) / TOTAL_CE;
  let notaFinal = (notaCG * 1 + notaCE * 2) / 3;
  return {
    notaCG: notaCG.toFixed(2),
    notaCE: notaCE.toFixed(2),
    notaFinal: notaFinal.toFixed(2),
    situacao: notaFinal >= 6 ? "Aprovado" : "Reprovado"
  };
}

app.post("/calcular", (req, res) => {
  const cg = parseInt(req.body.cg) || 0;
  const ce = parseInt(req.body.ce) || 0;
  const resultado = calcularNotas(cg, ce);
  res.json(resultado);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
