import { getStudent } from "../../assets/js/api/students/get.js";
import { deleteStudent } from "../../assets/js/api/students/delete.js";
import { getSession } from "../../assets/js/main.js";

const btnAddStudent = document.querySelector("#btn-add-student")
const titlePage = document.querySelector("#title-page")
const subTitlePage = document.querySelector("#sub-title-page")


function showErrorCard(textError) {
    const cardError = document.querySelector('#card-error');
    const textErrorElement = document.querySelector('#text-error');

    textErrorElement.textContent = textError || "houve um erro ao carregar a funcionalidade, tente novamente mais tarde.";
    cardError.style.display = 'flex';
}

async function deletStudents(id, token) {


    const confirmDelete = confirm("Tem certeza que deseja deletar este aluno?");

    if (!confirmDelete) 
        return;

    try {
        const session = getSession();
        
        const result = await deleteStudent(id, token);

        if (!result) {
            alert("Erro ao deletar o aluno, tente novamente mais tarde.");
            return;
        }

        alert("Aluno deletado com sucesso!");
        window.location.reload();
    
    } catch (error) {
        console.error(error);
        alert("Erro ao deletar o aluno, tente novamente mais tarde.");
    }
    

}

async function renderCardStudents(user, token) {

    const listCardStudents = document.querySelector("#list-card-students")


    const response = await getStudent(token)



    if (!response) {
        showErrorCard("Não foi possível carregar os alunos, tente novamente mais tarde.")
        return;
    }
    
    if (response.length === 0) {
        showErrorCard("Não há alunos para mostrar, tente adicionar um novo aluno.")
        return;
    }


    response.forEach(student => {
    
        const cardStudent = document.createElement("div")
        cardStudent.classList.add("card-aluno")
        
        cardStudent.innerHTML = `
            <div class="info-aluno">
                <div class="circle-profile-aluno">
                    <div>
                        <span>
                            ${student.nome.split(" ")[0].charAt(0)}${student.nome.split(" ")[1].charAt(0)}
                        </span>
                    </div>
                </div>
                <div class="name-and-plano">
                    <a href="#">${student.nome}</a>
                    <small>
                        <i class="bi bi-award"></i>
                        ${student.ativo ? "Ativo" : "Inativo"}
                    </small>
                </div>
        
                <a class="estado" id="btn-view-profile" href="./ficha/index.html">Ver a Ficha</a>
            </div>
        
            <div class="card-btns" style="display: ${user.role === "admin" ? "flex" : "none"}">
        
                    <a href="#" class="btn-delete">
                        <i class="bi bi-trash"></i>
                        <span>Eliminar</span>
                    </a>

            </div>

            `

            const btnViewProfile = cardStudent.querySelector("#btn-view-profile");
            
            btnViewProfile.addEventListener("click", (e) => {    
                e.preventDefault();

                localStorage.setItem("studentId", student.id)
                window.location.href = "./ficha/index.html"
            })


           const btnDelete = cardStudent.querySelector(".btn-delete");

            btnDelete.addEventListener("click", async (e) => {
                e.preventDefault();

                btnDelete.disabled = true;
                const originalText = btnDelete.textContent;
                btnDelete.textContent = "Eliminando...";

                try {
                    await deletStudents(student.id, token);
                } catch (error) {
                    console.error(error);

                    btnDelete.disabled = false;
                    btnDelete.textContent = originalText;
                }
            });
        
        listCardStudents.appendChild(cardStudent)
        
    })



}

function renderAdmin(session) {

    btnAddStudent.style.display = "flex"
    titlePage.textContent = "Gestão de todos os alunos"
    subTitlePage.textContent = "Gerencie todos os alunos do ginásio!!!"

    renderCardStudents(session.user, session.access_token)


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
            renderAdmin(session);
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