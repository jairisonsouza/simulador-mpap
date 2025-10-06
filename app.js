const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const TOTAL_CG = 20;
const TOTAL_CE = 30;
const MIN_PASS = 6.0;

function calcularNotas(cg, ce) {
  const notaCG = (cg * 10) / TOTAL_CG;
  const notaCE = (ce * 10) / TOTAL_CE;
  const notaFinalRaw = (notaCG * 1 + notaCE * 2) / 3;
  const aprovado = notaFinalRaw >= MIN_PASS;

  return {
    acertosCG: cg,
    acertosCE: ce,
    notaCG,
    notaCE,
    notaFinalRaw,
    aprovado
  };
}

app.post("/calcular", (req, res) => {
  const cg = Number(req.body.cg);
  const ce = Number(req.body.ce);

  if (!Number.isInteger(cg) || !Number.isInteger(ce)) {
    return res.status(400).json({ error: "Acertos devem ser números inteiros." });
  }
  if (cg < 0 || cg > TOTAL_CG || ce < 0 || ce > TOTAL_CE) {
    return res
      .status(400)
      .json({ error: `Intervalos válidos: cg 0-${TOTAL_CG}, ce 0-${TOTAL_CE}.` });
  }

  const resultado = calcularNotas(cg, ce);

  res.json({
    acertosCG: resultado.acertosCG,
    acertosCE: resultado.acertosCE,
    notaCG: Number(resultado.notaCG.toFixed(2)),
    notaCE: Number(resultado.notaCE.toFixed(2)),
    notaFinal: Number(resultado.notaFinalRaw.toFixed(2)),
    notaFinalRaw: Number(resultado.notaFinalRaw.toPrecision(10)),
    aprovado: resultado.aprovado,
    situacao: resultado.aprovado ? "Aprovado" : "Reprovado",
  });
});

app.listen(3000, () => console.log("Servidor em http://localhost:3000"));
