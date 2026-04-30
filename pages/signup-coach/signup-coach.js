import { validateName, validateEmail } from "../../assets/js/main.js"
import { signupCoach } from "../../assets/js/api/signup-coach.js";

const nameSignIn = document.querySelector('#name-signIn');
const emailSignIn = document.querySelector('#email-signIn');
const especializacaoSignIn = document.querySelector('#especializacao-signIn');
const genderSignIn = document.querySelector('#gender-signIn');
const passwordSignIn = document.querySelector('#password-signIn');
const buttonSignIn = document.querySelector('#button-signIn');


const dataCoach = {
  "nome": "",
  "email": "",
  "especialidade": "",
  "genero": "",
  "password": ""
}


function validateForm() {

    if ( nameSignIn.value.trim() === '' || emailSignIn.value.trim() === '' || especializacaoSignIn.value.trim() === '' || genderSignIn.value.trim() === '' || passwordSignIn.value.trim() === '' ) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (!validateName(nameSignIn.value.trim())) {
        alert('Por favor, insira um nome válido.');
        return false;
    }

    if (!validateEmail(emailSignIn.value.trim())) {
        alert('Por favor, insira um email válido.');
        return false;
    }

    if (passwordSignIn.value.trim().length < 6) {
        alert('A senha deve conter pelo menos 6 caracteres.');
        return false;
    }


    return true;
}


buttonSignIn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!validateForm()) 
        return;

    const originalText = buttonSignIn.textContent;
    buttonSignIn.disabled = true;
    buttonSignIn.textContent = "Carregando...";

    dataCoach.nome = nameSignIn.value;
    dataCoach.email = emailSignIn.value;
    dataCoach.especialidade = especializacaoSignIn.value;
    dataCoach.genero = genderSignIn.value;
    dataCoach.password = passwordSignIn.value;

    try {
        const response = await signupCoach(dataCoach);

        alert('Coach cadastrado com sucesso, aguarde a aprovação do administrador para acessar a plataforma.');
        window.location.href = '../signIn/index.html';

    } catch (error) {

        if (error.message === 'EMAIL_EXISTE') {
            alert('Este email já está cadastrado.');
        } else {
            alert(error.message || 'Erro ao cadastrar o coach.');
        }

    } finally {
        buttonSignIn.disabled = false;
        buttonSignIn.textContent = originalText;
    }
});