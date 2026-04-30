import { getSession, validateName } from "../../../assets/js/main.js";
import { getPaymentPlanById } from "../../../assets/js/api/payment-plans/getByID.js";
import { updatePaymentPlan } from "../../../assets/js/api/payment-plans/update.js"; // crie esta função

const inputNome = document.querySelector('#input-nome');
const inputPreco = document.querySelector('#input-preco');
const selectDuracao = document.querySelector('#duracao-plano');
const btnSubmitPlano = document.querySelector('#btn-submit-plano');

let dataPlan = {
    nome: "",
    preco: 0,
    duracao_dias: 0,
    exercicios: []
};


function validateForm() {

    if (!inputNome.value.trim() || !inputPreco.value.trim() || !selectDuracao.value.trim()) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!validateName(inputNome.value.trim())) {
        alert("O nome do plano deve conter apenas letras e espaços.");
        return false;
    }

    const precoValue = parseFloat(inputPreco.value);
    if (isNaN(precoValue) || precoValue <= 0) {
        alert("O preço deve ser um número positivo.");
        return false;
    }

    const duracaoValue = parseInt(selectDuracao.value);
    if (isNaN(duracaoValue) || duracaoValue <= 0) {
        alert("Por favor, selecione uma duração válida.");
        return false;
    }

    return true;
}


function obterExercicios() {
    const exercicios = document.querySelectorAll(".exercicio-item");
    const lista = [];

    exercicios.forEach(item => {
        if (item.value.trim() !== "" && validateName(item.value.trim())) {
            lista.push(item.value.trim());
        }
    });

    return lista;
}


function preencherFormulario(plano) {

    inputNome.value = plano.nome;
    inputPreco.value = plano.preco;
    selectDuracao.value = plano.duracao_dias.toString().padStart(2, '0');

    const exercicioItems = document.querySelectorAll('.exercicio-item');
    exercicioItems.forEach((item, index) => {
        if (plano.exercicios && plano.exercicios[index]) {
            item.value = plano.exercicios[index];
        }
    });
}


async function renderAdmin() {

    const idPlano = localStorage.getItem("planId");

    const session = getSession();

    console.log("Sessão do usuário:", session.access_token);

    if (!idPlano) {
        alert("Plano não encontrado, por favor selecione um plano para editar.");
        window.location.href = "../index.html";
        return;
    }

    const plano = await getPaymentPlanById(idPlano);

    if (!plano) {
        alert("Plano não encontrado, por favor selecione um plano para editar.");
        window.location.href = "../index.html";
        return;
    }

    preencherFormulario(plano);

    btnSubmitPlano.addEventListener('click', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const exercicios = obterExercicios();
        if (exercicios.length === 0) {
            alert("Por favor, adicione pelo menos um exercício válido.");
            return;
        }

        const textoOriginal = btnSubmitPlano.textContent;
        btnSubmitPlano.disabled = true;
        btnSubmitPlano.textContent = "Carregando...";

        dataPlan.nome = inputNome.value.trim();
        dataPlan.preco = parseFloat(inputPreco.value);
        dataPlan.duracao_dias = parseInt(selectDuracao.value);
        dataPlan.exercicios = exercicios;

        try {
            const result = await updatePaymentPlan(idPlano, dataPlan, session.access_token);

            if (result) {
                alert("Plano actualizado com sucesso!");
                window.location.href = "../index.html";
            } else {
                alert("Erro ao actualizar o plano!");
            }

        } catch (error) {
            console.error(error);
            alert("Erro ao actualizar o plano!");

        } finally {
            btnSubmitPlano.disabled = false;
            btnSubmitPlano.textContent = textoOriginal;
        }
    });
}


function error404() {
    window.location.href = "../../404/index.html";
}


async function initEditarPlanos() {

    const session = getSession();

    if (!session || !session.user) {
        return error404();
    }

    const { user } = session;

    switch (user.role) {
        case "admin":
            await renderAdmin();
            break;
        default:
            error404();
            break;
    }
}

initEditarPlanos();