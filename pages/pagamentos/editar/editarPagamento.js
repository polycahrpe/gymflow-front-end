import { getSession } from "../../../assets/js/main.js"
import { getPaymentById } from "../../../assets/js/api/payments/getByID.js"


const dataPagamentoEditado = {
  "valor": 0,
  "data_pagamento": "2026-05-27",
  "status": "pago",
  "observacao": "string"
}


async function getPaymentId() {

    const paymentId = localStorage.getItem("paymentUpdateId");

    if (!paymentId) {
        alert("ID do pagamento não encontrado. Redirecionando para a página de pagamentos.");
        window.location.href = "../index.html";
        return null;
    }

    const session = getSession();

    try {
        const payment = await getPaymentById(paymentId, session.access_token);
        
        if (!payment) {
            alert("Pagamento não encontrado. Redirecionando para a página de pagamentos.");
            window.location.href = "../index.html";
            return null;
        }

        return payment;
        
    } catch (error) {
        console.error("Erro ao obter detalhes do pagamento:", error);
        alert("Erro ao obter detalhes do pagamento. Redirecionando para a página de pagamentos.");
        window.location.href = "../index.html";
        return null;
    }

}


async function renderPaymentDetails(payment) {

    const response = await getPaymentId();

    const { student, payment_plan } = response;

    const initialsAlunoEditarPagamento = document.querySelector("#initials-aluno-editar-pagamento");
    const initials = student.nome.split(" ").map(n => n[0]).join("").toUpperCase();
    initialsAlunoEditarPagamento.textContent = initials;

    const nomeAlunoElement = document.querySelector("#nome-aluno-editar-pagamento");
    nomeAlunoElement.textContent = student.nome;

    const emailAlunoElement = document.querySelector("#email-aluno-editar-pagamento");
    emailAlunoElement.textContent = student.email;

    const nomePlanoEditarPagamento = document.querySelector("#nome-plano-editar-pagamento");
    nomePlanoEditarPagamento.textContent = payment_plan.nome;

    const valorPlanoEditarPagamento = document.querySelector("#valor-plano-editar-pagamento");
    valorPlanoEditarPagamento.textContent = payment_plan.preco.toFixed(2);

    const prazoPlanoEditarPagamento = document.querySelector("#prazo-plano-editar-pagamento");
    prazoPlanoEditarPagamento.textContent = `${payment_plan.duracao_dias} Dias`;

    const valorEditarPagamento = document.querySelector("#valor-editar-pagamento");
    valorEditarPagamento.value = response.valor.toFixed(2);

    const dataEditarPagamento = document.querySelector("#data-editar-pagamento");
    dataEditarPagamento.value = response.data_pagamento;

    const observacaoEditarPagamento = document.querySelector("#observacao-editar-pagamento");
    observacaoEditarPagamento.value = response.observacao;



}

async function initEditarPagamento() {

    const session = getSession();
    const { user } = session;

    
    switch (user.role) {
        case "admin":
            await renderPaymentDetails(session);
            break;
        default:
            error404();
            break;
    }

}

initEditarPagamento();