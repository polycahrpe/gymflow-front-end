import { getSession } from "../../assets/js/main.js";


const btnAddStudent = document.querySelector("#btn-add-student")


function renderAdmin() {

    btnAddStudent.style.display = "flex"

}

function renderCoach(user) {
    console.log(user)
}

function renderStudent() {
    
}

function error404() {
    window.location.href = "../404/index.html";
}


function initAlunos() {

    const session = getSession();
    const { user } = session;



    switch (user.role) {
        case "admin":
            renderAdmin();
            break;
        case "coach":
            renderCoach(user);
            break;
        case "student":
            renderStudent();
            break;
        default:
            error404();
            break;
    }

}

initAlunos();