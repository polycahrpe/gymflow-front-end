import { createPaymentPlan } from "../../../assets/js/api/payment-plans/create.js";
import { getSession, validateName } from "../../../assets/js/main.js";


const namePlan = document.querySelector("#nome-plano")
const price = document.querySelector("#preco")
const durationPlan = document.querySelector("#duracao-plano")
const descricaoPlan = document.querySelector("#descricao-plano")
const btnSubmit = document.querySelector("#btn-submit-plano")


let dataPlan = {
    "name": "",
    "price": 0,
    "duration_months": "",
    "description": ""
}

function validateForm() {

    if (!namePlan.value.trim() || !price.value.trim() || !durationPlan.value.trim() || !descricaoPlan.value.trim()) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!validateName(namePlan.value.trim())) {
        alert("O nome do plano deve conter apenas letras e espaços (sem números ou caracteres especiais).");
        return false;
    }

    const priceValue = parseFloat(price.value);
    if (isNaN(priceValue) || priceValue <= 0) {
        alert("O preço deve ser um número positivo");
        return false;
    }

    if (durationPlan.value === "0") {
        alert("Por favor, selecione uma duração válida.");
        return false;
    }

    if (descricaoPlan.value.trim().length <= 10) {
        alert("A descrição deve ter mais de 10 caracteres.");
        return false;
    }

    return true;

}

function renderAdmin() {
    
   btnSubmit.addEventListener("click", async () => {
        if (!validateForm()) 
            return;

        dataPlan.name = namePlan.value.trim();
        dataPlan.price = parseFloat(price.value);
        dataPlan.duration_months = durationPlan.value;
        dataPlan.description = descricaoPlan.value.trim();

        try {
            const result = await createPaymentPlan(dataPlan);
            console.log("Plano criado:", result);
        } catch (error) {
            alert("Erro ao criar o plano!");
        }
    });
    
    
}


function error404() {
    window.location.href = "../../404/index.html";
}


function initNovoPlanos() {

    const session = getSession();
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