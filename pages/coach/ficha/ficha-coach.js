import { activeCoach } from "../../../assets/js/api/coach/active.js";
import { deactiveCoach } from "../../../assets/js/api/coach/deactive.js";
import { getCoachById } from "../../../assets/js/api/coach/getByID.js";
import { getSession } from "../../../assets/js/main.js";


async function changeStatusCoach(coach, token) {

    const session = getSession();


    if (coach.ativo) {

        console.log("DEsativar");
        

        try {
            const response = await deactiveCoach(coach.id, session.access_token);

            if (!response) {
                alert("Erro ao alterar status do Coach, tente novamente mais tarde.");
                return;
            }

            alert(`Coach ${coach.ativo ? "desativado" : "ativado"} com sucesso!`);
            loadStudentProfile(coach.id, session.access_token);
        } catch (error) {
            console.error('Erro ao alterar status do Coach:', error);
        }

    } else {

        console.log("Ativar");


        try {
            const response = await activeCoach(coach.id, session.access_token);
    
            if (!response) {
                alert("Erro ao alterar status do treinador, tente novamente mais tarde.");
                return;
            }
    
            alert(`Treinador ${coach.ativo ? "desativado" : "ativado"} com sucesso!`);
            loadCoachProfile(coach.id, session.access_token);
        } catch (error) {
            console.error('Erro ao alterar status do treinador:', error);
        }

    }
    

}


function showDatacoach(coach, token) {

        
    const session = getSession()

    const initialsElement = document.querySelector("#initials");
    const nameParts = coach.nome.split(" ");
    const initials = nameParts.map(part => part.charAt(0)).join("").toUpperCase();
    initialsElement.textContent = initials;

    const fullNameElement = document.querySelector("#full-name");
    fullNameElement.textContent = coach.nome;

    const emailElement = document.querySelector("#email");
    emailElement.textContent = `${coach.nome.toLowerCase().replace(/\s/g, ".")}@gymflow.com`;

    const btnAction = document.querySelector("#btn-action");
    const btnActionText = btnAction.querySelector("span");

    if (session.user.role === "admin") {
        btnAction.style.display = "flex"
    }

    btnActionText.textContent = coach.ativo
        ? "Desativar Coach"
        : "Ativar Coach";

    btnActionText.previousElementSibling.className = coach.ativo
        ? "bi bi-person-dash"
        : "bi bi-person-plus";

    btnAction.addEventListener("click", async () => {
        btnAction.disabled = true;

        const originalText = btnActionText.textContent;

        btnActionText.textContent = "Processando...";

        try {
            await changeStatusCoach(coach, token);
        } catch (error) {
            console.error(error);

            btnActionText.textContent = originalText;
        } finally {
            btnAction.disabled = false;
        }
    });

    const nomeCoach = document.querySelector("#nome-aluno");
    nomeCoach.textContent = coach.nome;

    const emailAluno = document.querySelector("#email-aluno");
    emailAluno.textContent = coach.email;

    const generoAluno = document.querySelector("#genero-aluno");
    generoAluno.textContent = coach.genero;

    const estadoAluno = document.querySelector("#estado-aluno");
    estadoAluno.textContent = coach.ativo ? "Ativo" : "Inativo";

    const { students } = coach

    if (students) {

        const cardListStudentCoach = document.querySelector("#card-list-student-coach")

        students.forEach( (student, index) => {
            const cardDiv = document.createElement("div")
            cardDiv.classList.add("card-content")

            cardDiv.innerHTML = `
                <div class="card-title-description anime-bottom">
                        <strong>Aluno ${index + 1}</strong>
                        <small>
                            Aqui você pode ver os dados do seu aluno.
                        </small>
                    </div>

                    <ul>

                        <li class="anime-bottom">
                            <strong>Nome do Aluno</strong>
                            <span id="nome-treinador">
                                ${student.nome}
                            </span>
                        </li>

                        <li class="anime-bottom">
                            <strong>Email</strong>
                            <span id="email-treinador">
                                ${student.email}
                            </span>
                        </li>

                        <li class="anime-bottom">
                            <strong>Genero</strong>
                            <span id="genero-treinador">
                                ${student.genero}
                            </span>
                        </li>

                        <li class="anime-bottom">
                            <strong>Dias restante</strong>
                            <span id="especialidade-treinador">
                                ${student.dias_restantes}
                            </span>
                        </li>
                    <ul>
                <div class="card-title-description anime-bottom">
            
            `

            cardListStudentCoach.appendChild(cardDiv)
        });
        


        
    }


}

async function loadCoachProfile(id, token) {

    try {

        const response = await getCoachById(id, token);

        if (!response) {
            alert("Erro ao carregar os dados do aluno, tente novamente mais tarde.");
            return;
        }

        showDatacoach(response, token);

    } catch (error) {
        console.error('Erro ao carregar perfil do aluno:', error);
    }

}


function initLoadcoachProfile() {

    const session = getSession();   
    const { user } = session;
    
    if (user.role !== "admin") {
        error404()
        return;
    }

    const coachId = localStorage.getItem("coachId");

    if (!coachId) {
        alert("Nenhum treinador selecionado. Redirecionando para a lista de treinadores.");
        window.location.href = "../index.html";
        return;
    }

    loadCoachProfile(coachId, session.access_token);

}

initLoadcoachProfile()