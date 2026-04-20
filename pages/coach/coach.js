import { getSession } from "../../assets/js/main.js";
import { getCoach } from "../../assets/js/api/coach/get.js";


const containerCardCoach = document.querySelector("#container-card-coach");

function showErrorCard(textError) {
    const cardError = document.querySelector('#card-error');
    const textErrorElement = document.querySelector('#text-error');

    textErrorElement.textContent = textError || "houve um erro ao carregar a funcionalidade, tente novamente mais tarde.";
    cardError.style.display = 'flex';
}

async function renderCardCoach() {

    const response = await getCoach();

    if (!response) {
        showErrorCard("Não foi possível carregar os coaches, tente novamente mais tarde.");
        return;
    }

    const { coaches } = response;    

    if (coaches.length === 0) {
        showErrorCard("Não há coaches para mostrar.");
        return;
    }

    coaches.forEach(coach => {
        const cardCoach = document.createElement("div")
        cardCoach.classList.add("card-coach")

        cardCoach.innerHTML = `

            <div class="info-coach">
                <div class="circle-profile-coach">
                    <div>
                        <span>
                            ${coach.name.split(" ")[0].charAt(0)}${coach.name.split(" ")[1].charAt(0)}
                        </span>
                    </div>
                </div>
                <div class="name-and-plano">
                    <a href="#">${coach.name}</a>
                    <small>
                        <i class="bi bi-bookmark-star"></i>
                        <span>Coach</span>
                    </small>
                </div>

                <a class="estado" href="./ficha/index.html">Ficha</a>
            </div>


            <div class="card-btns">
                <a href="./editar/index.html" class="btn-edit">
                    <i class="bi bi-pencil"></i>
                    <span>Editar</span>
                </a>

                <a href="#" class="btn-delete">
                    <i class="bi bi-trash"></i>
                    <span>Eliminar</span>
                </a>
            </div>
        `

        containerCardCoach.appendChild(cardCoach);
    });
}   

function renderAdmin() {

    renderCardCoach();
    
}


function error404() {
    window.location.href = "../404/index.html";
}


function initCoach() {

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

initCoach();