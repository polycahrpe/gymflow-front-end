import { getSession } from "../../assets/js/main.js"
import { marcarSaida } from "../../assets/js/api/presences/marcar-saida.js";
import { getPresencaHoje } from "../../assets/js/api/presences/get-hoje.js";
import { marcarEntrada } from "../../assets/js/api/presences/marcar-entrada.js";


function renderDataCoach(coach) {    

    const nameMyCoach = document.querySelector("#name-my-coach");
    nameMyCoach.textContent = nameMyCoach ? coach.nome : "Houve um erro ao Carregar os dados...";

    const initialMycoach = document.querySelector("#initial-my-coach");
    initialMycoach.textContent = initialMycoach ? `${coach.nome.split(" ")[0].charAt(0)}${coach.nome.split(" ")[1].charAt(0)}` : "Houve um erro ao Carregar os dados...";

    const especialidadeMyCoach = document.querySelector("#especialidade-my-coach");
    especialidadeMyCoach.textContent = especialidadeMyCoach ? `${coach.especialidade}` : "Houve um erro ao Carregar os dados...";

    const emailMyCoach = document.querySelector("#email-my-coach");
    emailMyCoach.textContent = emailMyCoach ? `${coach.email}` : "Houve um erro ao Carregar os dados...";

    const genderMyCoach = document.querySelector("#gender-my-coach");
    genderMyCoach.textContent = genderMyCoach ? `${coach.genero}` : "Houve um erro ao Carregar os dados...";

    const totalStudentsMyCoach = document.querySelectorAll(".total-students-my-coach");
    totalStudentsMyCoach.forEach((element) => {
        element.textContent = totalStudentsMyCoach ? `${coach.alunos.length} Aluno(s)` : "Houve um erro ao Carregar os dados...";
    });


    if (coach.alunos.length === 0) {
        const listStudentMyCoach = document.querySelector("#list-student-my-coach");
        listStudentMyCoach.textContent = listStudentMyCoach ? "Ainda não tem alunos associados..." : "Houve um erro ao Carregar os dados...";
    } else {
        coach.alunos.forEach((aluno) => {
            const listStudentMyCoach = document.querySelector("#list-student-my-coach");
            const itemStudent = document.createElement("li");
            
            itemStudent.innerHTML = `
                <div>
                    <span>${aluno.nome.split(" ")[0].charAt(0)}${aluno.nome.split(" ")[1].charAt(0)}</span>
                </div>
            `;

            listStudentMyCoach.appendChild(itemStudent);
        });
    }

}

function renderDataPlan(plan, diasRestantes) {

    const nomeMyPlano = document.querySelector("#nome-my-plano");
    nomeMyPlano.textContent = nomeMyPlano ? `${plan.nome}` : "Houve um erro ao Carregar os dados...";

    const precoMyPlano = document.querySelector("#preco-my-plano");
    precoMyPlano.textContent = precoMyPlano ? `${plan.preco} Kz` : "Houve um erro ao Carregar os dados...";

    const duracaoMyPlano = document.querySelector("#duracao-my-plano");
    duracaoMyPlano.textContent = duracaoMyPlano ? `${plan.duracao_dias} Dia(s)` : "Houve um erro ao Carregar os dados...";

    const prazoMyPlano = document.querySelector("#prazo-my-plano");
    prazoMyPlano.textContent = prazoMyPlano ? `${diasRestantes} Dia(s)` : "Houve um erro ao Carregar os dados...";
}

function renderPagamentoCorrente(pagamento) {

    const cardMyPayment = document.querySelector("#card-my-payment");
    cardMyPayment.style.display = pagamento.length > 0 ? "flex" : "none";

    const valorPagoMyPayment = document.querySelector("#valor-pago-my-payment");
    valorPagoMyPayment.textContent = valorPagoMyPayment ? `${pagamento[0].valor} Kz` : "Houve um erro ao Carregar os dados...";

    const dataPagamentoMyPayment = document.querySelector("#data-pagamento-my-payment");
    dataPagamentoMyPayment.textContent = dataPagamentoMyPayment ? `${new Date(pagamento[0].data_pagamento).toLocaleDateString("pt-PT")}` : "Houve um erro ao Carregar os dados...";

    const dataVencimentoMyPayment = document.querySelector("#data-vencimento-my-payment");
    dataVencimentoMyPayment.textContent = dataVencimentoMyPayment ? `${new Date(pagamento[0].data_vencimento).toLocaleDateString("pt-PT")}` : "Houve um erro ao Carregar os dados...";

    const descricaoMyPayment = document.querySelector("#descricao-my-payment");
    descricaoMyPayment.textContent = descricaoMyPayment ? `${pagamento[0].observacao}` : "Houve um erro ao Carregar os dados...";
}

async function marcarSaidaAluno(dataStudent, btn) {
    
    const span = btn.querySelector("span");
    const textoOriginal = span.textContent;

    btn.disabled = true;
    span.textContent = "Marcando...";

    const dataClique = new Date();

    const saida = {
        student_id: dataStudent.user.id,
        hora_saida: dataClique.toLocaleTimeString("pt-PT", {
            hour12: false
        })
    };

    try {

        const response = await marcarSaida(
            saida,
            dataStudent.access_token
        );

        if (!response) {
            btn.disabled = false;
            span.textContent = textoOriginal;
            return alert("Erro ao marcar saída. Por favor, tente novamente.");
        }

        alert("Saída marcada com sucesso, aguarde a confirmação do administrador !");
        window.location.reload();

    } catch (error) {

        btn.disabled = false;
        span.textContent = textoOriginal;

        console.error("Erro ao marcar saída:", error);
        alert("Erro ao marcar saída. Por favor, tente novamente.");
    }

}

async function marcarPresenca(dataStudent, btn) {


    const span = btn.querySelector("span");
    const textoOriginal = span.textContent;

    btn.disabled = true;
    span.textContent = "Marcando...";

    const dataClique = new Date();

    const presenca = {
        student_id: dataStudent.user.id,
        data: dataClique.toISOString().split("T")[0],
        hora_entrada: dataClique.toLocaleTimeString("pt-PT", {
            hour12: false
        })
    };

    try {

        const response = await marcarEntrada(
            presenca,
            dataStudent.access_token
        );

        if (!response) {
            btn.disabled = false;
            span.textContent = textoOriginal;
            return alert("Erro ao marcar presença. Por favor, tente novamente.");
        }

        alert("Presença marcada com sucesso, aguarde a confirmação do administrador !");
        window.location.reload();

    } catch (error) {

        btn.disabled = false;
        span.textContent = textoOriginal;

        console.error("Erro ao marcar presença:", error);
        alert("Erro ao marcar presença. Por favor, tente novamente.");
    }
}

async function renderPresenca(presencaHoje) {

    const cardHoraEntrada = document.querySelector("#card-hora-entrada");
    const horaEntrada = document.querySelector("#hora-entrada");
    const estadoPresencaEntrada = document.querySelector("#estado-presenca-entrada");
    const btnMarcarEntrada = document.querySelector("#btn-marcar-presenca");

    const cardHoraSaida = document.querySelector("#card-hora-saida");
    const horaSaida = document.querySelector("#hora-saida");
    const estadoPresencaSaida = document.querySelector("#estado-presenca-saida");
    const btnMarcarSaida = document.querySelector("#btn-marcar-saida");

    const session = getSession();

    let responseAtualizada = null;

    let respParaVerificarSaida = null;
    
    if (!presencaHoje) {

        cardHoraEntrada.style.display = "flex";
        horaEntrada.textContent = presencaHoje ? `${presencaHoje.hora_entrada}` : "00:00:00";


        try {
            responseAtualizada = await getPresencaHoje(session.user.id, session.access_token);
        } catch (error) {
            console.error("Erro ao obter presença de hoje:", error);
        }


        if (responseAtualizada) {
            horaEntrada.textContent = responseAtualizada ? `${responseAtualizada.hora_entrada}` : "00:00:00"; 
            estadoPresencaEntrada.textContent = responseAtualizada.confirmado_entrada_em === null ? "Pendente" : "Confirmado"
            estadoPresencaEntrada.style.display = "flex";
            btnMarcarEntrada.style.display = "none";        
        } else {
            btnMarcarEntrada.style.display = "flex";
        }

    } else {

        cardHoraEntrada.style.display = "flex";
        horaEntrada.textContent = presencaHoje ? `${presencaHoje.hora_entrada}` : "00:00:00";
        estadoPresencaEntrada.textContent = presencaHoje.confirmado_entrada_em === null ? "Pendente" : "Confirmado"
        estadoPresencaEntrada.style.display = "flex";


        try {
            respParaVerificarSaida = await getPresencaHoje(session.user.id, session.access_token);

            if (respParaVerificarSaida.hora_saida) {
                
                btnMarcarSaida.style.display = "none";
                cardHoraSaida.style.display = "flex";
                horaSaida.textContent = respParaVerificarSaida ? `${respParaVerificarSaida.hora_saida}` : "00:00:00";
                estadoPresencaSaida.textContent = respParaVerificarSaida.confirmado_saida_em === null ? "Pendente" : "Confirmado"
                estadoPresencaSaida.style.display = "flex";

            }

        } catch (error) {
            console.error("Erro ao obter presença de hoje:", error);
        }


        if (presencaHoje.hora_entrada && presencaHoje.confirmado_entrada_em !== null && !respParaVerificarSaida.hora_saida) {
            btnMarcarSaida.style.display = "flex";
        }

    }

    btnMarcarEntrada.addEventListener("click", async () => {
        await marcarPresenca(session, btnMarcarEntrada);
    });


    btnMarcarSaida.addEventListener("click", async () => {
        await marcarSaidaAluno(session, btnMarcarSaida);
    });


}


export async function aluno(data) {


    const cardMyCoach = document.querySelector("#card-my-coach");
    cardMyCoach.style.display = 'flex';


    const cardMyPlano = document.querySelector("#card-my-plano");
    cardMyPlano.style.visibility = 'visible';

    await renderPresenca(data.user.presenca_hoje);

    renderDataCoach(data.user.coach);

    renderDataPlan(data.user.payment_plan, data.user.dias_restantes);

    renderPagamentoCorrente(data.user.pagamentos);

}