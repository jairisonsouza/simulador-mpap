document.getElementById("form-simulador").addEventListener("submit", async function (e) {
    e.preventDefault();

    const alerta = document.getElementById("alerta");
    const resultadoDiv = document.getElementById("resultado");

    alerta.classList.add("d-none");
    resultadoDiv.classList.add("d-none");

    const cg = document.getElementById("cg").value;
    const ce = document.getElementById("ce").value;

    try {
        const res = await fetch("/calcular", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `cg=${cg}&ce=${ce}`
        });

        const data = await res.json();

        if (!res.ok) {
            alerta.textContent = data.error || "Erro ao calcular notas.";
            alerta.classList.remove("d-none");
            return;
        }

        document.getElementById("notaCG").innerText = data.notaCG;
        document.getElementById("notaCE").innerText = data.notaCE;
        document.getElementById("notaFinal").innerText = data.notaFinal;
        document.getElementById("situacao").innerText = data.situacao;

        const situacaoEl = document.getElementById("situacao");
        situacaoEl.classList.remove("text-success", "text-danger");
        situacaoEl.classList.add(data.aprovado ? "text-success" : "text-danger");

        resultadoDiv.classList.remove("d-none");
    } catch (err) {
        alerta.textContent = "Falha na comunicação com o servidor.";
        alerta.classList.remove("d-none");
    }
});