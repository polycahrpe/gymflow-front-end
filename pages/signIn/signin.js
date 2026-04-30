import { loginFrom } from "../../assets/js/api/login.js"

const buttonSignIn = document.querySelector('#button-signIn');
const emailSignIn = document.querySelector('#email-signIn');
const passwordSignIn = document.querySelector('#password-signIn');

let dataUser = {
    email: '',
    password: ''
};

function validateForm() {
    if (emailSignIn.value.trim() === '' || passwordSignIn.value.trim() === '') {
        alert('Por favor, preencha todos os campos');
        return false;
    }
    return true;
}

buttonSignIn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const textoOriginal = buttonSignIn.textContent;
    buttonSignIn.disabled = true;
    buttonSignIn.textContent = "Processando...";

    dataUser.email = emailSignIn.value.trim();
    dataUser.password = passwordSignIn.value.trim();

    try {
        const result = await loginFrom(dataUser);

        if (!result) {
            alert("Login falhou");
            return;
        }

        localStorage.setItem("gymFlowSession", JSON.stringify(result));

        window.location.href = "../home/index.html";

    } catch (error) {
        alert("Email ou password incorrectos.");

    } finally {
        buttonSignIn.disabled = false;
        buttonSignIn.textContent = textoOriginal;
    }
});