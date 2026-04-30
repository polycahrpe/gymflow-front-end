import { createPaymentPlan } from "../../../assets/js/api/payment-plans/create.js";
import { getSession, validateName } from "../../../assets/js/main.js";

const namePlan = document.querySelector("#nome-plano");
const preco = document.querySelector("#preco");
const duracao_dias = document.querySelector("#duracao-plano");
const btnSubmit = document.querySelector("#btn-submit-plano");

let dataPlan = {
    nome: "",
    preco: 0,
    duracao_dias: 0,
    exercicios: []
};

// ✅ CORREÇÃO: pegar inputs dentro de cada .exercicio-item


function validateForm() {

    if (!namePlan.value.trim() || !preco.value.trim() || !duracao_dias.value.trim()) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!validateName(namePlan.value.trim())) {
        alert("O nome do plano deve conter apenas letras e espaços.");
        return false;
    }

    const precoValue = parseFloat(preco.value);
    if (isNaN(precoValue) || precoValue <= 0) {
        alert("O preço deve ser um número positivo");
        return false;
    }

    const duracaoValue = parseInt(duracao_dias.value);
    if (isNaN(duracaoValue) || duracaoValue <= 0) {
        alert("Por favor, selecione uma duração válida.");
        return false;
    }

    return true;
}


function obterExercicios() {
    const exercicios = document.querySelectorAll(".exercicio-item"); // corrigido
    const lista = [];


    exercicios.forEach(item => {
        if (item.value.trim() !== "" && validateName(item.value.trim())) { // validação individual
            lista.push(item.value.trim());
        }
    });

    
    return lista;
}


function renderAdmin() {
    btnSubmit.addEventListener("click", async () => {
    if (!validateForm()) return;

    const exercicios = obterExercicios();
    if (exercicios.length === 0) {
        alert("Por favor, adicione pelo menos um exercício válido.");
        return;
    }

    // Desabilita o botão e muda o texto
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Carregando...";

    dataPlan.nome = namePlan.value.trim();
    dataPlan.preco = parseFloat(preco.value);
    dataPlan.duracao_dias = parseInt(duracao_dias.value);
    dataPlan.exercicios = exercicios;

    try {

        const session = getSession();
        const result = await createPaymentPlan(dataPlan, session.access_token);

        if (result) {
            alert("Plano criado com sucesso!");
            window.location.href = "../index.html";
        } else {
            alert("Erro ao criar o plano!");
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao criar o plano!");

    } finally {
        // Reabilita o botão em caso de erro
        btnSubmit.disabled = false;
        btnSubmit.textContent = textoOriginal;
    }
});
}

function error404() {
    window.location.href = "../../404/index.html";
}

function initNovoPlanos() {

    const session = getSession();

    if (!session || !session.user) {
        return error404();
    }

    const { user } = session;

    switch (user.role) {
        case "admin":
            renderAdmin();
            break;
        default:
            error404();
            break;
    }
}

initNovoPlanos();