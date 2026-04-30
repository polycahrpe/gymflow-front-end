import { getSession } from "../../assets/js/main.js";
import { admin } from "./admin.js";

const strongWellcomeName = document.querySelector("#strong-wellcome-name");
const spanWellcomeRoleState = document.querySelector("#span-wellcome-role-state");
const pWellcomePainelState = document.querySelector("#p-wellcome-painel-state");

//  function admin...
function renderFrequencyWeek(frequencyWeek) {
    const listDayweek = document.querySelector("#list-dias-semanal")

    frequencyWeek.forEach(day => {
        const li = document.createElement("li");
        li.classList.add("anime-bottom");

        li.innerHTML = `
            <strong>${day.day}</strong>
            <small>${day.presence}%</small>
            <div class="bar" style="height: ${day.presence}%;"></div>
        `

        listDayweek.appendChild(li);
    });

}

function renderAdmin(session) {

    const { user } = session;

    strongWellcomeName.textContent = strongWellcomeName ? `Olá ${user.nome}!!!` : "Houve um erro ao Carregar os dados...";
    spanWellcomeRoleState.textContent = spanWellcomeRoleState ? `${user.role} Activo` : "Houve um erro ao Carregar os dados...";
    pWellcomePainelState.textContent = pWellcomePainelState ? `Painel de ${user.role} ativado...` : "Houve um erro ao Carregar os dados...";

    const cardStactcsAdmin = document.querySelector("#card-stactcs-admin")
    const cardStudentsAdmin = document.querySelector("#card-students-admin")
    const cardCoachsAdmin = document.querySelector("#card-coachs-admin")

    cardStactcsAdmin.style.display = 'flex';
    cardStudentsAdmin.style.display = 'flex';

    admin(session);
    
}
//  function admin end...


//  function coach...
function renderCoach(user) {

    strongWellcomeName.textContent = strongWellcomeName ? `Olá ${user.nome}!!!` : "Houve um erro ao Carregar os dados...";
    spanWellcomeRoleState.textContent = spanWellcomeRoleState ? `${user.role} Activo` : "Houve um erro ao Carregar os dados...";
    pWellcomePainelState.textContent = pWellcomePainelState ? `Painel de ${user.role} ativado...` : "Houve um erro ao Carregar os dados...";


    const cardStactcsCoach = document.querySelector("#card-stactcs-coach")
    const cardStudentsCoach = document.querySelector("#card-students-coach")

    cardStactcsCoach.style.display = 'flex';
    cardStudentsCoach.style.display = 'flex';
    

}

//  function coach end...


//  function student...
function renderStudent(user) {

    strongWellcomeName.textContent = strongWellcomeName ? `Olá ${user.nome}!!!` : "Houve um erro ao Carregar os dados...";
    spanWellcomeRoleState.textContent = spanWellcomeRoleState ? `${user.role} Activo` : "Houve um erro ao Carregar os dados...";
    pWellcomePainelState.textContent = pWellcomePainelState ? `Painel de ${user.role} ativado...` : "Houve um erro ao Carregar os dados...";

}

//  function student end...



function renderCardProfile(user) {

    const nameCardProfile = document.querySelector("#name-card-profile");
    const roleCarProfile = document.querySelector("#role-card-profile");
    const circleCardProfile = document.querySelector("#circle-card-profile");


    circleCardProfile.textContent = circleCardProfile ? `${user.nome.split(" ")[0].charAt(0)}${user.nome.split(" ")[1].charAt(0)}` : "Error name";
    nameCardProfile.textContent = nameCardProfile ? user.nome : "Error name";
    roleCarProfile.textContent = roleCarProfile ? `@${user.role}` : "Error role";

}


function initHome() {

    const session = getSession();
    const { user } = session;

    if (!user) {
        window.location.href = "../index.html";
        return;
    }

    renderCardProfile(user)

    switch (user.role) {
        case "admin":
            renderAdmin(session);
            break;
        case "coach":
            renderCoach(user);
            break;
        case "student":
            break;
        default:
            break;
    }
  
}

initHome();