import { getSession } from "../../assets/js/main.js";
import { admin } from "./admin.js";
import { aluno } from "./aluno.js";
import { coach } from "./coach.js";

const strongWellcomeName = document.querySelector("#strong-wellcome-name");
const spanWellcomeRoleState = document.querySelector("#span-wellcome-role-state");
const pWellcomePainelState = document.querySelector("#p-wellcome-painel-state");



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
function renderCoach(session) {

    const { user } = session

    strongWellcomeName.textContent = strongWellcomeName ? `Olá ${user.nome}!!!` : "Houve um erro ao Carregar os dados...";
    spanWellcomeRoleState.textContent = spanWellcomeRoleState ? `${user.role} Activo` : "Houve um erro ao Carregar os dados...";
    pWellcomePainelState.textContent = pWellcomePainelState ? `Painel de ${user.role} ativado...` : "Houve um erro ao Carregar os dados...";


    const cardStactcsCoach = document.querySelector("#card-stactcs-coach")
    const cardStudentsCoach = document.querySelector("#card-students-coach")

    cardStactcsCoach.style.display = 'flex';
    cardStudentsCoach.style.display = 'flex';
    
    coach(session)

}

//  function coach end...


//  function student...
function renderStudent(session) {

    const { user } = session;

    strongWellcomeName.textContent = strongWellcomeName ? `Olá ${user.nome}!!!` : "Houve um erro ao Carregar os dados...";
    spanWellcomeRoleState.textContent = spanWellcomeRoleState ? `A sua conta esta ativa, restam ${user.dias_restantes} dias para expirar !!!` : "Houve um erro ao Carregar os dados...";
    pWellcomePainelState.textContent = pWellcomePainelState ? `Bem-vindo no Painel de Aluno, onde poderá gerir as suas atividades e acompanhar o seu progresso. A plataforma GymFlow oferece uma experiência personalizada para maximizar o seu potencial físico e mental.` : "Houve um erro ao Carregar os dados...";

    aluno(session);

}

//  function student end...



function renderCardProfile(user) {

    const nameCardProfile = document.querySelector("#name-card-profile");
    const roleCarProfile = document.querySelector("#role-card-profile");
    const circleCardProfile = document.querySelector("#circle-card-profile");


    circleCardProfile.textContent = circleCardProfile ? `${user.nome.split(" ")[0].charAt(0)}${user.nome.split(" ")[1].charAt(0)}` : "Error name";
    nameCardProfile.textContent = nameCardProfile ? user.nome : "Error name";

    if (user.role === "admin") {
        roleCarProfile.textContent = roleCarProfile ? "Administrador" : "Error role";
    } else if (user.role === "coach") {
        roleCarProfile.textContent = roleCarProfile ? "Treinador" : "Error role";
    } else if (user.role === "student") {
        roleCarProfile.textContent = roleCarProfile ? "Aluno" : "Error role";
    } else {
        roleCarProfile.textContent = roleCarProfile ? "Error role" : "Error role";
    }
    

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
            renderCoach(session);
            break;
        case "student":
            renderStudent(session);
        default:
            break;
    }
  
}

initHome();