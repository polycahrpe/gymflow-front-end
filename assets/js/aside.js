import { getDashboardLinksByRole } from "./dashboardLinks.js";
import { getSession } from "./main.js";

function handleLogout() {
    // localStorage.removeItem("gymFlowSession");
    window.location.href = "../signIn/index.html";
}

function renderAside(role) {

    const asideUl = document.querySelector("#aside ul");
    if (!asideUl) {
        alert("Houve um Erro ao renderizar itens da Navabar")
        return;
    }    

    const items = getDashboardLinksByRole(role);
    
    
    items.forEach(item => {

        let li = document.createElement("li");

        const onclick = item.action === "logout" ? 'onclick="handleLogout(event)"' : "";

        li.innerHTML = `
            <a href="${item.path}" class="link" ${onclick}>
            <i class="bi ${item.icon} icon-link"></i>
            <span class="text-link">${item.name}</span>
            </a>
        `;

        asideUl.appendChild(li);
        
    });
    
}

function initAside() {

    const session = getSession();
    const { role } = session.user;

    renderAside(role);

}

initAside();
