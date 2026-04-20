import { getSession, validateEmail } from "../../../assets/js/main.js";


const emailStudent = document.querySelector("#email-aluno")
const planStudent = document.querySelector("#plan-aluno")
const coachStudent = document.querySelector("#coach-aluno")
const btnSubmit = document.querySelector("#btn-submit-aluno")


let dataStudent = {
    "email": "",
    "plan": "",
    "coach": ""
}   

function validateForm() {

    if (!emailStudent.value.trim() || !planStudent.value.trim() || !coachStudent.value.trim()) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!validateEmail(emailStudent.value.trim())) {
        alert("Por favor, insira um endereço de email válido.");
        return false;
    }

    if (planStudent.value === "0") {
        alert("Por favor, selecione um plano.");
        return false;
    }

    if (coachStudent.value === "0") {
        alert("Por favor, selecione um coach.");
        return false;
    }

    return true
}


function renderAdmin() {

    btnSubmit.addEventListener("click", async () => {
        if (!validateForm()) 
            return;

        dataStudent.email = emailStudent.value.trim();
        dataStudent.plan = planStudent.value;
        dataStudent.coach = coachStudent.value;

        console.log(dataStudent);
    });

}


function error404() {
    window.location.href = "../../404/index.html";
}


function initNovoAluno() {

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

initNovoAluno();