import { getSession, validateEmail } from "../../../assets/js/main.js";


const emailCoach = document.querySelector('#email-coach');
const especialityCoach = document.querySelector('#especializacao-coach');
const btnSubmitCoach = document.querySelector('#btn-submit-coach');

let dataCoach = {
    "email": "",
    "especialidade": ""
}

function validateForm() {
    if (!emailCoach.value.trim() || !especialityCoach.value.trim()) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!validateEmail(emailCoach.value.trim())) {
        alert("Por favor, insira um endereço de email válido.");
        return false;
    }

    return true;
}

function renderAdmin() {


    btnSubmitCoach.addEventListener("click", async () => {
        if (!validateForm()) 
            return;

        dataCoach.email = emailCoach.value.trim();
        dataCoach.especialidade = especialityCoach.value.trim();

        console.log(dataCoach);
    });

}


function iniNovoCoach() {

    const session = getSession();
    const { user } = session; 

    console.log(user);
       

    switch (user.role) {
        case "admin":
            renderAdmin();
            break;
        default:
            error404();
            break;
    }

}

iniNovoCoach();