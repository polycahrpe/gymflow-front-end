import { getSession } from "../../assets/js/main.js";
import { getPaymentPlan } from "../../assets/js/api/payment-plans/get.js"
import { deletePaymentPlan } from "../../assets/js/api/payment-plans/delete.js";


function showErrorCard(textError) {
    const cardError = document.querySelector('#card-error');
    const textErrorElement = document.querySelector('#text-error');

    textErrorElement.textContent = textError || "houve um erro ao carregar a funcionalidade, tente novamente mais tarde.";
    cardError.style.display = 'flex';
}


async function deletePlan(id) {

    const confirmDelete = confirm("Tem certeza que deseja deletar este plano?");

    if (!confirmDelete) 
        return;

    try {
        const session = getSession();
        
        const result = await deletePaymentPlan(id, session.access_token);

        if (!result) {
            alert("Erro ao deletar o plano, tente novamente mais tarde.");
            return;
        }

        alert("Plano deletado com sucesso!");
        window.location.reload();
    
    } catch (error) {
        console.error(error);
        alert("Erro ao deletar o plano, tente novamente mais tarde.");
    }
    

}

function editPlan(id) {

    localStorage.setItem("planId", id);
    window.location.href = "./editar/index.html";

}


function listarPlanos(planos) {
     
    const listPlanos = document.querySelector('#list-planos');

    planos.forEach(plano => {
        const card = document.createElement('article');
        card.classList.add('card-plano');

        card.innerHTML = `
            <strong>${plano.nome}</strong>
            <p>${plano.preco} kz</p>
            <small>GymFlow</small>

            <div class="card-dias-qntdd">
                <span>
                    <i class="bi bi-stopwatch"></i>
                    <small>${plano.duracao_dias} dias</small>
                </span>
                <span>
                    <i class="bi bi-person"></i>
                    <small>00 Alunos</small>
                </span>
            </div>

            <ul>
                ${plano.exercicios.map(exercicio => `
                    <li>
                        <i class="bi bi-check-lg"></i>
                        <span>${exercicio}</span>
                    </li>
                `).join("")}
            </ul>

            <div class="card-btn">
                <a class="edit" href="./editar/index.html" id="${plano.id}">
                    <i class="bi bi-pen"></i>
                    <span>Editar</span>
                </a>
                <a class="delete" href="#">
                    <i class="bi bi-trash"></i>
                </a>
            </div>
        `
        const btnEdit = card.querySelector('.edit');
        btnEdit.addEventListener('click', (e) => {
            e.preventDefault();
            editPlan(plano.id);
        });

        const btnDelete = card.querySelector('.delete');
        btnDelete.addEventListener('click', async(e) => {
            e.preventDefault();
            deletePlan(plano.id);
        });

        listPlanos.appendChild(card);
    })
}


async function renderAdmin() {

    const response = await getPaymentPlan();

    if (!response) {
        showErrorCard("Erro na resposta do servidor, tente novamente mais tarde.");
        return;
    }

    if (!response || response.length === 0) {
        showErrorCard("Nenhum plano de pagamento encontrado.");
        return;
    }

    listarPlanos(response);
}

function error404() {
    window.location.href = "../404/index.html";
}


function initPlanos() {

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

initPlanos();