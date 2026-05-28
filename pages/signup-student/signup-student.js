import { getCoach } from "../../assets/js/api/coach/get.js";
import { getPaymentPlan } from "../../assets/js/api/payment-plans/get.js" 
import { validateName, validateEmail } from "../../assets/js/main.js"
import { create } from "../../assets/js/api/students/create.js"

const nameSignIn = document.querySelector('#name-signIn');
const emailSignIn = document.querySelector('#email-signIn');
const coachSignIn = document.querySelector('#coach-signIn');
const planSignIn = document.querySelector('#plan-signIn');
const genderSignIn = document.querySelector('#gender-signIn');
const acessCodeSignIn = document.querySelector('#acess-code-signIn');
const passwordSignIn = document.querySelector('#password-signIn');
const buttonSignIn = document.querySelector('#button-signIn');

const data = {
  "nome": "",
  "email": "",
  "password": "",
  "genero": "",
  "coach_id": "",
  "payment_plan_id": "",
  "access_code": ""
}

async function populatePaymentPlanOptions() {
    const paymentPlans = await getPaymentPlan();

    paymentPlans.forEach(plan => {
        if (plan.ativo === true) {
            const option = document.createElement('option');
            option.value = plan.id;
            option.textContent = `${plan.nome} (${plan.preco} kz)`;
            planSignIn.appendChild(option);
        }
    });
}   

async function populateCoachOptions() {
    const coaches = await getCoach();

    coaches.forEach(coach => {

        if (coach.ativo === true) {
            const option = document.createElement('option');
            option.value = coach.id;
            option.textContent = coach.nome;
            coachSignIn.appendChild(option);
        }
        
    });
}

function validateForm() {

    if (nameSignIn.value.trim() === '' || emailSignIn.value.trim() === '' || passwordSignIn.value.trim() === '' || genderSignIn.value.trim() === '' || coachSignIn.value.trim() === '' || planSignIn.value.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (!validateName(nameSignIn.value.trim())) {
        alert('Nome inválido.');
        return false;
    }

    if (!validateEmail(emailSignIn.value.trim())) {
        alert('Email inválido.');
        return false;
    }   

    if (acessCodeSignIn.value.trim().length < 5) {
        alert('O código de acesso deve ter pelo menos 5 caracteres.');
        return false;
    }

    return true;
}

buttonSignIn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const originalText = buttonSignIn.textContent;
    buttonSignIn.disabled = true;
    buttonSignIn.textContent = "Carregando...";

    data.nome = nameSignIn.value.trim();
    data.email = emailSignIn.value.trim();
    data.password = passwordSignIn.value.trim();
    data.genero = genderSignIn.value.trim();
    data.coach_id = coachSignIn.value.trim();
    data.payment_plan_id = planSignIn.value.trim();
    data.access_code = acessCodeSignIn.value.trim()

    try {
        
        const response = await create(data);


        alert('Cadastrado com sucesso, Faça login para acessar sua conta.');
        window.location.href = '../signIn/index.html';

    } catch (error) {
        if (error.message === 'EMAIL_EXISTE') {
            alert('Este email já está cadastrado.');
        } else {
            alert(error.message || 'Erro ao cadastrar o aluno.');
        }
    } finally {
        buttonSignIn.disabled = false;
        buttonSignIn.textContent = originalText;
    }

})

populateCoachOptions();
populatePaymentPlanOptions();