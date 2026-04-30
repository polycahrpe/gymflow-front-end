import { getSession } from "./main.js";

function initHeader() {

    const session = getSession();
    const { user } = session;
  
    const circleProfileHeader = document.querySelector("#circle-profile-header");
    const nameEl = document.querySelector("#first-name");
    const roleEl = document.querySelector("#role");
  
    if (circleProfileHeader) circleProfileHeader.textContent = user.nome.split(" ")[0].charAt(0);
    if (nameEl) nameEl.textContent = user.nome.split(" ")[0];
    if (roleEl) roleEl.textContent = user.role;
  
}

initHeader();