import { getSession } from "../../../assets/js/main.js";
import { getStudentById } from "../../../assets/js/api/students/getByID.js";
import { active } from "../../../assets/js/api/students/active.js";
import { deactive } from "../../../assets/js/api/students/deactive.js";


async function changeStatusStudent(stundent) {

    const session = getSession();

    if (stundent.ativo) {

        try {
            const response = await deactive(stundent.id, session.access_token);

            if (!response) {
                alert("Erro ao alterar status do aluno, tente novamente mais tarde.");
                return;
            }

            alert(`Aluno ${stundent.ativo ? "desativado" : "ativado"} com sucesso!`);
            loadStudentProfile(stundent.id, session.access_token);
        } catch (error) {
            console.error('Erro ao alterar status do aluno:', error);
            alert("Erro ao alterar status do aluno, tente novamente mais tarde.");  
        }

    } else {

        try {
            const response = await active(stundent.id, session.access_token);
    
            if (!response) {
                alert("Erro ao alterar status do aluno, tente novamente mais tarde.");
                return;
            }
    
            alert(`Aluno ${stundent.ativo ? "desativado" : "ativado"} com sucesso!`);
            loadStudentProfile(stundent.id, session.access_token);
        } catch (error) {
            console.error('Erro ao alterar status do aluno:', error);
            alert("Erro ao alterar status do aluno, tente novamente mais tarde.");  
        }

    }
    

}

function showDataStudent(student) {

    console.log(student);

    const initialsElement = document.querySelector("#initials");
    const nameParts = student.nome.split(" ");
    const initials = nameParts.map(part => part.charAt(0)).join("").toUpperCase();
    initialsElement.textContent = initials;

    const fullNameElement = document.querySelector("#full-name");
    fullNameElement.textContent = student.nome;

    const emailElement = document.querySelector("#email");
    emailElement.textContent = `${student.nome.toLowerCase().replace(/\s/g, ".")}@gymflow.com`;

    const btnAction = document.querySelector("#btn-action");
    const btnActionText = btnAction.querySelector("span");

    btnActionText.textContent = student.ativo
        ? "Desativar Aluno"
        : "Ativar Aluno";

    btnActionText.previousElementSibling.className = student.ativo
        ? "bi bi-person-dash"
        : "bi bi-person-plus";

    btnAction.addEventListener("click", async () => {
        btnAction.disabled = true;

        const originalText = btnActionText.textContent;

        btnActionText.textContent = "Processando...";

        try {
            await changeStatusStudent(student);
        } catch (error) {
            console.error(error);

            btnActionText.textContent = originalText;
        } finally {
            btnAction.disabled = false;
        }
    });

    const nomeAluno = document.querySelector("#nome-aluno");
    nomeAluno.textContent = student.nome;

    const emailAluno = document.querySelector("#email-aluno");
    emailAluno.textContent = student.email;

    const generoAluno = document.querySelector("#genero-aluno");
    generoAluno.textContent = student.genero;

    const estadoAluno = document.querySelector("#estado-aluno");
    estadoAluno.textContent = student.ativo ? "Ativo" : "Inativo";

    const nomePlanoElement = document.querySelector("#nome-plano");
    nomePlanoElement.textContent = student.payment_plan.nome;

    const valorPlano = document.querySelector("#valor-plano");
    valorPlano.textContent = `${student.payment_plan.preco} Kz`;

    const duracaoPlano = document.querySelector("#duracao-plano");
    duracaoPlano.textContent = `${student.payment_plan.duracao_dias} dias`;

    const nomeTreinador = document.querySelector("#nome-treinador");
    nomeTreinador.textContent = student.coach ? student.coach.nome : "Sem treinador";

    const emailTreinador = document.querySelector("#email-treinador");
    emailTreinador.textContent = student.coach ? student.coach.email : "Sem email";

    const especialidadeTreinador = document.querySelector("#especialidade-treinador");
    especialidadeTreinador.textContent = student.coach ? student.coach.especialidade : "Sem especialidade";

    const generoTreinador = document.querySelector("#genero-treinador");
    generoTreinador.textContent = student.coach ? student.coach.genero : "Sem gênero";

    const prazoPlano = document.querySelector("#prazo-plano");
    prazoPlano.textContent = student.dias_restantes ? `${student.dias_restantes} dias para expirar` : "Sem prazo";


}

async function loadStudentProfile(id, token) {

    try {

        const response = await getStudentById(id, token);

        if (!response) {
            alert("Erro ao carregar os dados do aluno, tente novamente mais tarde.");
            return;
        }

        showDataStudent(response);

    } catch (error) {
        console.error('Erro ao carregar perfil do aluno:', error);
    }

}

function error404() {
    window.location.href = "../../404/index.html";
}

function initLoadStudentProfile() {

    const session = getSession();   
    const { user } = session;
    
    if (user.role !== "admin") {
        error404()
        return;
    }

    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
        alert("Nenhum aluno selecionado. Redirecionando para a lista de alunos.");
        window.location.href = "../index.html";
        return;
    }

    loadStudentProfile(studentId, session.access_token);

}

initLoadStudentProfile()