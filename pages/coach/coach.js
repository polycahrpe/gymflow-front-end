import { getSession } from "../../assets/js/main.js";
import { getCoach } from "../../assets/js/api/coach/get.js";


const containerCardCoach = document.querySelector("#container-card-coach");

function showErrorCard(textError) {
    const cardError = document.querySelector('#card-error');
    const textErrorElement = document.querySelector('#text-error');

    textErrorElement.textContent = textError || "houve um erro ao carregar a funcionalidade, tente novamente mais tarde.";
    cardError.style.display = 'flex';
}

async function renderCardCoach(session) {


    const response = await getCoach(session.access_token);


    if (!response) {
        showErrorCard("Não foi possível carregar os coaches, tente novamente mais tarde.");
        return;
    }

    if (response.length === 0) {
        showErrorCard("Não há coaches para mostrar.");
        return;
    }

    response.forEach(coach => {
        const cardCoach = document.createElement("div")
        cardCoach.classList.add("card-coach")

        cardCoach.innerHTML = `

            <div class="info-coach">
                <div class="circle-profile-coach">
                    <div>
                        <span>
                            ${coach.nome.split(" ")[0].charAt(0)}
                        </span>
                    </div>
                </div>
                <div class="name-and-plano">
                    <a href="#">${coach.nome}</a>
                    <small>
                        <i class="bi bi-bookmark-star"></i>
                        <span>Coach</span>
                    </small>
                </div>

                <a class="estado" href="#" id="btn-view-profile">
                    <i class="bi bi-eye"></i>
                    <span>Ver a ficha do treinador</span>
                </a>
            </div>


            <div class="card-btns">
                <a href="#" class="btn-delete">
                    <i class="bi bi-trash"></i>
                    <span>Eliminar</span>
                </a>
            </div>
        `

        const btnViewProfile = cardCoach.querySelector("#btn-view-profile");
        
        btnViewProfile.addEventListener("click", (e) => {    
            e.preventDefault();

            localStorage.setItem("coachId", coach.id)
            window.location.href = "./ficha/index.html"
        })

        containerCardCoach.appendChild(cardCoach);
    });
}   

function renderAdmin(session) {

    renderCardCoach(session);
    
}

function error404() {
    window.location.href = "../404/index.html";
}


function initCoach() {

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

initCoach();