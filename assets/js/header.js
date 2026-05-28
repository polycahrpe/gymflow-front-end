import { getSession } from "./main.js";

function initHeader() {

    const session = getSession();
    const { user } = session;
  
    const circleProfileHeader = document.querySelector("#circle-profile-header");
    const nameEl = document.querySelector("#first-name");
    const roleEl = document.querySelector("#role");
  
    if (circleProfileHeader) circleProfileHeader.textContent = user.nome.split(" ")[0].charAt(0);
    if (nameEl) nameEl.textContent = user.nome.split(" ")[0];

    if (user.role === "admin") {
        if (roleEl) roleEl.textContent = "Administrador";
    } else if (user.role === "coach") {
        if (roleEl) roleEl.textContent = "Treinador";
    } else if (user.role === "student") {
        if (roleEl) roleEl.textContent = "Aluno";
    } else {
        if (roleEl) roleEl.textContent = "Error role";
    }

}

initHeader();