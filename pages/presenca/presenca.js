import { getSession } from "../../assets/js/main.js";
import { getPresenca } from "../../assets/js/api/presences/get.js";
import { confirmarSaidaPatch } from "../../assets/js/api/presences/confirmar-saida.js";
import { confirmarEntradaPatch } from "../../assets/js/api/presences/confirmar-entrada.js";


function renderPresenca(presenca) {
    const container = document.getElementById("presencas");

    presenca.sort((a, b) => new Date(b.data) - new Date(a.data));

    const agrupadoPorData = presenca.reduce((acc, item) => {
        if (!acc[item.data]) acc[item.data] = [];
        acc[item.data].push(item);
        return acc;
    }, {});

    let html = "";

    for (const [data, registros] of Object.entries(agrupadoPorData)) {
        const isHoje = data === new Date().toISOString().split("T")[0];

        html += `<section class="section-precensa anime-bottom">
            <span class="title">${isHoje ? "Check-ins hoje" : data}</span>`;

        registros.forEach(item => {
            const iniciais = item.student.nome
                .split(" ")
                .map(n => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

            const podConfirmarEntrada = item.status === "pendente_entrada";
            const podConfirmarSaida = item.status === "pendente_saida";

            html += `
                <article class="card">
                    <div class="circle"><span>${iniciais}</span></div>
                    <div class="name">
                        <strong>Nome</strong>
                        <span>${item.student.nome}</span>
                    </div>
                    <div class="date">
                        <strong>Data</strong>
                        <span>${item.data}</span>
                    </div>
                    <div class="init">
                        <div>
                            <strong>Entrada</strong>
                            <span>${item.hora_entrada || "--:--"}</span>
                        </div>
                        ${podConfirmarEntrada ? `
                        <button data-action="entrada" data-id="${item.id}">
                            <i class="bi bi-check-circle"></i>
                            <small>Confirmar</small>
                        </button>` : ""}
                    </div>
                    <div class="end">
                        <div>
                            <strong>Saída</strong>
                            <span>${item.hora_saida || "--:--"}</span>
                        </div>
                        ${podConfirmarSaida ? `
                        <button data-action="saida" data-id="${item.id}">
                            <i class="bi bi-check-circle"></i>
                            <small>Confirmar</small>
                        </button>` : ""}
                    </div>
                </article>`;
        });

        html += `</section>`;
    }

    container.innerHTML = html;

    // ✅ Event delegation — funciona dentro do módulo
    container.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === "entrada") confirmarEntrada(id, btn);
        if (action === "saida") confirmarSaida(id, btn);
    });
}

async function confirmarEntrada(attendanceId, btn) {
    btn.disabled = true;
    btn.innerHTML = `<small>A confirmar...</small>`;
    const session = getSession()

    try {

        const response = await confirmarEntradaPatch(attendanceId, session.access_token);

        if (!response) {
            alert("Erro ao confirmar entrada, tente novamente mais tarde.");
            btn.disabled = false;
            btn.innerHTML = `<i class="bi bi-check-circle"></i><small>Confirmar</small>`;
            return;
        }

        alert("Entrada confirmada com sucesso!");
        btn.innerHTML = `<i class="bi bi-check-circle-fill"></i><small>Confirmado</small>`;
        window.location.reload();

    } catch (error) {
        console.error(error);
        alert("Erro ao confirmar entrada.");
        btn.disabled = false;
        btn.innerHTML = `<i class="bi bi-check-circle"></i><small>Confirmar</small>`;
    }

}

async function confirmarSaida(attendanceId, btn) {
    btn.disabled = true;
    btn.innerHTML = `<small>A confirmar...</small>`;
    const session = getSession()

    try {

        const response = await confirmarSaidaPatch(attendanceId, session.access_token);

        if (!response) {
            alert("Erro ao confirmar saída, tente novamente mais tarde.");
            btn.disabled = false;
            btn.innerHTML = `<i class="bi bi-check-circle"></i><small>Confirmar</small>`;
            return;
        }

        alert("Saída confirmada com sucesso!");
        btn.innerHTML = `<i class="bi bi-check-circle-fill"></i><small>Confirmado</small>`;
        window.location.reload();

    } catch (error) {
        console.error(error);
        alert("Erro ao confirmar saída.");
        btn.disabled = false;
        btn.innerHTML = `<i class="bi bi-check-circle"></i><small>Confirmar</small>`;
    }
   
}

async function renderAdmin(session) {
    try {
        const response = await getPresenca(session.access_token);

        if (!response) {
            alert("Erro ao carregar as presenças, tente novamente mais tarde.");
            return;
        }

        renderPresenca(response);

    } catch (error) {
        console.error('Erro ao renderizar admin:', error);
    }
}

async function initPresenca() {
    const session = getSession();
    const { user } = session;

    switch (user.role) {
        case "admin":
            await renderAdmin(session);
            break;
        default:
            error404();
            break;
    }
}

initPresenca();