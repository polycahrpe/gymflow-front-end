import { getSession } from "../../../assets/js/main.js";


function renderAdmin() {


}


function error404() {
    window.location.href = "../../404/index.html";
}


function initEditarAluno() {

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

initEditarAluno();