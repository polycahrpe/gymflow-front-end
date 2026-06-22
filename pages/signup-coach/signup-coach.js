import { validateName, validateEmail } from "../../assets/js/main.js"
import { signupCoach } from "../../assets/js/api/signup-coach.js";

const nameSignIn = document.querySelector('#name-signIn');
const emailSignIn = document.querySelector('#email-signIn');
const especialidadeSignIn = document.querySelector('#especializacao-signIn');
const experienceInputs = document.querySelectorAll('input[name="experience"]');
const genderSignIn = document.querySelector('#gender-signIn');
const accessCodeSignIn = document.querySelector('#access-code-signIn');
const passwordSignIn = document.querySelector('#password-signIn');
const buttonSignIn = document.querySelector('#button-signIn');


const dataCoach = {
    nome: "",
    email: "",
    password: "",
    especialidade: "",
    experiencias: [],
    genero: "",
    access_code: ""
}


function getExperiencias() {
    const selecionadas = [];
    experienceInputs.forEach(input => {
        if (input.checked) {
            selecionadas.push(input.value);
        }
    });
    return selecionadas;
}


function validateForm() {

    if (
        nameSignIn.value.trim() === '' ||
        emailSignIn.value.trim() === '' ||
        especialidadeSignIn.value.trim() === '' ||
        genderSignIn.value.trim() === '' ||
        accessCodeSignIn.value.trim() === '' ||
        passwordSignIn.value.trim() === ''
    ) {
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

    if (accessCodeSignIn.value.trim().length !== 7 || !accessCodeSignIn.value.trim().match(/^[a-zA-Z0-9]{7}$/)) {
        alert('O código de acesso deve ter exactamente 7 caracteres alfanuméricos.');
        return false;
    }

    if (passwordSignIn.value.trim().length < 6) {
        alert('A senha deve conter pelo menos 6 caracteres.');
        return false;
    }

    if (getExperiencias().length === 0) {
        alert('Por favor, selecione pelo menos uma experiência.');
        return false;
    }

    return true;
}


buttonSignIn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const originalText = buttonSignIn.textContent;
    buttonSignIn.disabled = true;
    buttonSignIn.textContent = "Carregando...";

    dataCoach.nome = nameSignIn.value.trim();
    dataCoach.email = emailSignIn.value.trim();
    dataCoach.especialidade = especialidadeSignIn.value;
    dataCoach.genero = genderSignIn.value;
    dataCoach.password = passwordSignIn.value.trim();
    dataCoach.access_code = accessCodeSignIn.value.trim().toUpperCase();
    dataCoach.experiencias = getExperiencias();

    console.log(dataCoach);

    try {
        const response = await signupCoach(dataCoach);

        alert('Coach cadastrado com sucesso. Aguarda a aprovação do administrador para aceder à plataforma.');
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