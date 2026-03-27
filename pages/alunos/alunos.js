import { getSession } from "../../assets/js/main.js";

const btnAddStudent = document.querySelector("#btn-add-student")
const titlePage = document.querySelector("#title-page")
const subTitlePage = document.querySelector("#sub-title-page")


function renderCardStudents(role) {

    const listCardStudents = document.querySelector("#list-card-students")
    const cardStudent = document.createElement("div")
    cardStudent.classList.add("card-aluno")

    cardStudent.innerHTML = `
        <div class="info-aluno">
            <div class="circle-profile-aluno">
                <div>
                    <span>AS</span>
                </div>
            </div>
            <div class="name-and-plano">
                <a href="#">Alberto Silva</a>
                <small>Aluno</small>
            </div>

            <a class="estado" href="./ficha/index.html">Ficha</a>
        </div>

        <div class="card-btns" style="display: ${role === "admin" ? "flex" : "none"}">
                <a href="./editar/index.html" class="btn-edit">
                    <i class="bi bi-pencil"></i>
                    <span>Editar</span>
                </a>

                <a href="#" class="btn-delete">
                    <i class="bi bi-trash"></i>
                    <span>Eliminar</span>
                </a>
        </div>
    `

    listCardStudents.appendChild(cardStudent)

}

function renderAdmin(user) {

    btnAddStudent.style.display = "flex"
    titlePage.textContent = "Gestão de todos os alunos"
    subTitlePage.textContent = "Gerencie todos os alunos do ginásio!!!"

    renderCardStudents(user.role)


}

function renderCoach(user) {

    titlePage.textContent = "Gestão dos meus Alunos!!!"
    subTitlePage.textContent = "Sendo coach aqui podes gerenciar todos os seu alunos!!!"

    renderCardStudents(user.role)

}









function error404() {
    window.location.href = "../404/index.html";
}


function initAlunos() {

    const session = getSession();
    const { user } = session;



    switch (user.role) {
        case "admin":
            renderAdmin(user);
            break;
        case "coach":
            renderCoach(user);
            break;
        default:
            error404();
            break;
    }

}

initAlunos();