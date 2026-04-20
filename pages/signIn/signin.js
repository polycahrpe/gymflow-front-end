import { loginFrom } from "../../assets/js/api/login.js"

const buttonSignIn = document.querySelector('#button-signIn');
const phoneSignIn = document.querySelector('#phone-signIn');
const passwordSignIn = document.querySelector('#password-signIn');

let dataUser = {
    number: '',
    password: ''
};

function validateForm() {

    if (phoneSignIn.value.trim() === '' || passwordSignIn.value.trim() === '') 
        return alert('Por favor, preencha todos os campos');
    
    return true;

}

buttonSignIn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dataUser.number = phoneSignIn.value.trim();
    dataUser.password = passwordSignIn.value.trim();    

    try {
        const result = await loginFrom(dataUser);
        console.log("Sucesso:", result);
    } catch (error) {
        alert("Erro ao fazer login!");
    }

});