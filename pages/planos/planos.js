import { getSession } from "../../assets/js/main.js";
import { getPaymentPlan } from "../../assets/js/api/payment-plans/get.js"


function showErrorCard(textError) {
    const cardError = document.querySelector('#card-error');
    const textErrorElement = document.querySelector('#text-error');

    textErrorElement.textContent = textError || "houve um erro ao carregar a funcionalidade, tente novamente mais tarde.";
    cardError.style.display = 'flex';
}


async function renderAdmin() {

    const response = await getPaymentPlan();

    if (!response) {
        showErrorCard("Erro ao carregar os planos de pagamento.")
        return;
    }

    const { plans } = response;

    const listPlanos = document.querySelector('#list-planos');

    plans.forEach(plan => {
        const card = document.createElement('article');
        card.classList.add('card-plano');

        card.innerHTML = `
            <strong>${plan.name}</strong>
                    <p>${plan.price} kz</p>
                    <small>por ${plan.duration} dias</small>

                    <div class="card-dias-qntdd">
                        <span>
                            <i class="bi bi-stopwatch"></i>
                            <small>30 dias</small>
                        </span>
                        <span>
                            <i class="bi bi-person"></i>
                            <small>145 Alunos </small>
                        </span>
                    </div>

                    <ul>
                        <li>
                            <i class="bi bi-check-lg"></i>
                            <span>
                                Acesso à musculação
                            </span>
                        </li>
                        <li>
                            <i class="bi bi-check-lg"></i>
                            <span>
                                Acesso ao cardiô
                            </span>
                        </li>
                        <li>
                            <i class="bi bi-check-lg"></i>
                            <span>
                                Vestuario e chuveiro
                            </span>
                        </li>
                        <li>
                            <i class="bi bi-check-lg"></i>
                            <span>
                                Avaliação física Inicial
                            </span>
                        </li>
                    </ul>

                    <div class="card-btn">
                        <a class="edit" href="./editar/index.html">
                            <i class="bi bi-pen"></i>
                            <span>Editar</span>
                        </a>
                        <a>
                            <i class="bi bi-trash"></i>
                        </a>
                </div>
        `

        

        listPlanos.appendChild(card);
    })
    


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