import { getSession } from "../../assets/js/main.js";


const strongWellcomeName = document.querySelector("#strong-wellcome-name");
const spanWellcomeRoleState = document.querySelector("#span-wellcome-role-state");
const pWellcomePainelState = document.querySelector("#p-wellcome-painel-state");



function renderCoach(user) {

    strongWellcomeName.textContent = strongWellcomeName ? `Olá ${user.name}!!!` : "Houve um erro ao Carregar os dados...";
    spanWellcomeRoleState.textContent = spanWellcomeRoleState ? `${user.role} Activo` : "Houve um erro ao Carregar os dados...";
    pWellcomePainelState.textContent = pWellcomePainelState ? `Painel de ${user.role} ativado...` : "Houve um erro ao Carregar os dados...";


    const cardStactcsCoach = document.querySelector("#card-stactcs-coach")
    const cardStudentsCoach = document.querySelector("#card-students-coach")

    cardStactcsCoach.style.display = 'flex';
    cardStudentsCoach.style.display = 'flex';
    

}

function renderCardProfile(user) {

    const nameCardProfile = document.querySelector("#name-card-profile");
    const roleCarProfile = document.querySelector("#role-card-profile");
    const circleCardProfile = document.querySelector("#circle-card-profile");


    circleCardProfile.textContent = circleCardProfile ? `${user.name.split(" ")[0].charAt(0)}${user.name.split(" ")[1].charAt(0)}` : "Error name";
    nameCardProfile.textContent = nameCardProfile ? user.name : "Error name";
    roleCarProfile.textContent = roleCarProfile ? `@${user.role}` : "Error role";

}


function initHome() {

    const session = getSession();
    const { user } = session;
  
    
    renderCardProfile(user)


    if (user.role === "coach")
        return renderCoach(user);
  
  
}

initHome();