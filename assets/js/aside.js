import { getDashboardLinksByRole } from "./dashboardLinks.js";
import { getSession } from "./main.js";

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("gymFlowSession");
    window.location.href = "../signIn/index.html";
}

function renderAside(role) {

    const asideUl = document.querySelector("#aside ul");
    if (!asideUl) {
        alert("Houve um Erro ao renderizar itens da Navabar");
        return;
    }

    const items = getDashboardLinksByRole(role);

    items.forEach(item => {

        let li = document.createElement("li");

        li.innerHTML = `
            <a href="${item.path}" class="link">
                <i class="bi ${item.icon} icon-link"></i>
                <span class="text-link">${item.name}</span>
            </a>
        `;

        if (item.action === "logout") {
            li.querySelector("a").addEventListener("click", handleLogout);
        }

        asideUl.appendChild(li);

    });

}

function initAside() {

    const session = getSession();
    const { role } = session.user;

    renderAside(role);

}

initAside();