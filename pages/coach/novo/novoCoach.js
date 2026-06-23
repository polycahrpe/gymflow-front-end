import { getSession } from "../../../assets/js/main.js";
import { generate } from "../../../assets/js/api/access-codes/create.js";
import { getAccessCodes } from "../../../assets/js/api/access-codes/get.js";

const btnGenerateAccessCode = document.querySelector("#btn-generate-access-code");

function listAccessCode(listCode) {
    const ulAccessCode = document.querySelector("#ul-access-code");

    // limpa a lista
    ulAccessCode.innerHTML = "";

    // ordena: não usados (false) primeiro, usados (true) depois
    listCode.sort((a, b) => a.usado - b.usado);

    listCode.forEach(item => {
        const li = document.createElement("li");

        if (item.usado) {
            li.style.backgroundColor = "#f6f7f8"
        }

        li.innerHTML = `
            <strong>${item.code}</strong>
            <span>${item.usado ? "Usado" : "Não usado"}</span>
        `;

        ulAccessCode.appendChild(li);
    });
}

async function renderAdmin(session) {
    const response = await getAccessCodes(session.access_token);

    if (response) {
        listAccessCode(response);
    }

    btnGenerateAccessCode.addEventListener("click", async () => {
        // guardar texto original
        const originalText = btnGenerateAccessCode.textContent;

        // desabilitar botão e mudar texto
        btnGenerateAccessCode.disabled = true;
        btnGenerateAccessCode.textContent = "Gerando...";

        try {
            const newCode = await generate(session.access_token);

            if (newCode) {
                const response = await getAccessCodes(session.access_token);

                if (response) {
                    listAccessCode(response);
                }
            }
        } finally {
            // reabilitar botão e restaurar texto
            btnGenerateAccessCode.disabled = false;
            btnGenerateAccessCode.textContent = originalText;
        }
    });
}

function error404() {
    window.location.href = "../../404/index.html";
}

function initNovoAluno() {
    const session = getSession();
    const { user } = session;

    switch (user.role) {
        case "admin":
            renderAdmin(session);
            break;
        default:
            error404();
            break;
    }
}

initNovoAluno();