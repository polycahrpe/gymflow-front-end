import { getSession } from "../../../assets/js/main.js"
import { create } from "../../../assets/js/api/payments/create.js"
import { getStudent } from "../../../assets/js/api/students/get.js"
import { getStudentById } from "../../../assets/js/api/students/getByID.js"

const dataNovoPagamento = {
  "student_id": "",
  "payment_plan_id": "",
  "valor": 0,
  "data_pagamento": "2026-05-22",
  "observacao": "string"
}



async function createNovoPagamento(student_id, payment_plan_id, valor, data_pagamento, observacao, access_token) {

    dataNovoPagamento.student_id = student_id;
    dataNovoPagamento.payment_plan_id = payment_plan_id;
    dataNovoPagamento.valor = valor;
    dataNovoPagamento.data_pagamento = data_pagamento;
    dataNovoPagamento.observacao = observacao;

    try {
        const result = await create(dataNovoPagamento, access_token);
        alert("Pagamento criado com sucesso!!!")
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Erro ao criar novo pagamento:", error);
    }

}


function cardShowDataAluno(student, access_token) {

    const cardDataAluno = document.querySelector("#card-data-aluno");
    cardDataAluno.style.display = "flex";

    const nomeAlunoPagamento = document.querySelector("#nome-aluno-pagamento");
    nomeAlunoPagamento.textContent = student.nome;

    const emailAlunoPagamento = document.querySelector("#email-aluno-pagamento");
    emailAlunoPagamento.textContent = student.email;

    const nomePlanoPagamento = document.querySelector("#nome-plano-pagamento");
    nomePlanoPagamento.textContent = student.payment_plan.nome;

    const valorPlanoPagamento = document.querySelector("#valor-plano-pagamento");
    valorPlanoPagamento.textContent = `${student.payment_plan.preco},00 Kz`;

    const prazoPlanoPagamento = document.querySelector("#prazo-plano-pagamento");
    prazoPlanoPagamento.textContent = `${student.payment_plan.duracao_dias} dia(s)`;

    const valorPago = document.querySelector("#valor-pago");
    valorPago.value = student.payment_plan.preco;

    const dataPagamento = document.querySelector("#data-pagamento");
    const today = new Date().toISOString().split('T')[0];
    dataPagamento.value = today;

    const observacaoPagamento = document.querySelector("#observacao-pagamento");
    observacaoPagamento.value = `Pagamento referente ao plano ${student.payment_plan.nome}`;

    const btnSubmitPagamento = document.querySelector("#btn-submit-pagamento");

    btnSubmitPagamento.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!valorPago.value || !dataPagamento.value) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const anoAtual = new Date().getFullYear();

        const anoPagamento = new Date(dataPagamento.value).getFullYear();

        if (anoPagamento < anoAtual || anoPagamento > anoAtual) {
            alert("A data do pagamento deve ser do ano atual.");
            return;
        }

        // Desabilita o botão e muda o texto
        btnSubmitPagamento.disabled = true;

        const textoOriginal = btnSubmitPagamento.textContent;
        btnSubmitPagamento.textContent = "Carregando...";

        try {
            await createNovoPagamento(
                student.id,
                student.payment_plan.id,
                valorPago.value,
                dataPagamento.value,
                observacaoPagamento.value,
                access_token
            );
        } catch (error) {
            console.error(error);
            alert("Erro ao processar o pagamento.");
        } finally {
            // Reativa o botão e restaura o texto
            btnSubmitPagamento.disabled = false;
            btnSubmitPagamento.textContent = textoOriginal;
        }
    });

}


async function getAndListStudents(session) {
    const selectAluno = document.querySelector("#select-aluno");

    try {
        const students = await getStudent(session.access_token);

        students.forEach(student => {
            const option = document.createElement("option");
            option.value = student.id;
            option.textContent = student.nome;
            selectAluno.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao obter os alunos:", error);
    }


    selectAluno.addEventListener("change", async (event) => {
        const studentId = event.target.value;

        if (studentId) {
            try {
                const studentData = await getStudentById(studentId, session.access_token);
                cardShowDataAluno(studentData, session.access_token);
            } catch (error) {
                console.error("Erro ao obter os dados do aluno:", error);
            }
        }
    });
    
}


async function initNovoPagamento() {

    const session = getSession();
    const { user } = session;

    
    switch (user.role) {
        case "admin":
            await getAndListStudents(session);
            break;
        default:
            error404();
            break;
    }

}


initNovoPagamento();