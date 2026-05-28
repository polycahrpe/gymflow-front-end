
function renderDataCoach(coach) {    

    const nameMyCoach = document.querySelector("#name-my-coach");
    nameMyCoach.textContent = nameMyCoach ? coach.nome : "Houve um erro ao Carregar os dados...";

    const initialMycoach = document.querySelector("#initial-my-coach");
    initialMycoach.textContent = initialMycoach ? `${coach.nome.split(" ")[0].charAt(0)}${coach.nome.split(" ")[1].charAt(0)}` : "Houve um erro ao Carregar os dados...";

    const especialidadeMyCoach = document.querySelector("#especialidade-my-coach");
    especialidadeMyCoach.textContent = especialidadeMyCoach ? `${coach.especialidade}` : "Houve um erro ao Carregar os dados...";

    const emailMyCoach = document.querySelector("#email-my-coach");
    emailMyCoach.textContent = emailMyCoach ? `${coach.email}` : "Houve um erro ao Carregar os dados...";

    const genderMyCoach = document.querySelector("#gender-my-coach");
    genderMyCoach.textContent = genderMyCoach ? `${coach.genero}` : "Houve um erro ao Carregar os dados...";

    const totalStudentsMyCoach = document.querySelectorAll(".total-students-my-coach");
    totalStudentsMyCoach.forEach((element) => {
        element.textContent = totalStudentsMyCoach ? `${coach.alunos.length} Aluno(s)` : "Houve um erro ao Carregar os dados...";
    });


    if (coach.alunos.length === 0) {
        const listStudentMyCoach = document.querySelector("#list-student-my-coach");
        listStudentMyCoach.textContent = listStudentMyCoach ? "Ainda não tem alunos associados..." : "Houve um erro ao Carregar os dados...";
    } else {
        coach.alunos.forEach((aluno) => {
            const listStudentMyCoach = document.querySelector("#list-student-my-coach");
            const itemStudent = document.createElement("li");
            
            itemStudent.innerHTML = `
                <div>
                    <span>${aluno.nome.split(" ")[0].charAt(0)}${aluno.nome.split(" ")[1].charAt(0)}</span>
                </div>
            `;

            listStudentMyCoach.appendChild(itemStudent);
        });
    }

}

function renderDataPlan(plan, diasRestantes) {

    const nomeMyPlano = document.querySelector("#nome-my-plano");
    nomeMyPlano.textContent = nomeMyPlano ? `${plan.nome}` : "Houve um erro ao Carregar os dados...";

    const precoMyPlano = document.querySelector("#preco-my-plano");
    precoMyPlano.textContent = precoMyPlano ? `${plan.preco} Kz` : "Houve um erro ao Carregar os dados...";

    const duracaoMyPlano = document.querySelector("#duracao-my-plano");
    duracaoMyPlano.textContent = duracaoMyPlano ? `${plan.duracao_dias} Dia(s)` : "Houve um erro ao Carregar os dados...";

    const prazoMyPlano = document.querySelector("#prazo-my-plano");
    prazoMyPlano.textContent = prazoMyPlano ? `${diasRestantes} Dia(s)` : "Houve um erro ao Carregar os dados...";
}


export async function aluno(data) {

    const cardMyCoach = document.querySelector("#card-my-coach");
    cardMyCoach.style.display = 'flex';

    const cardMyPlano = document.querySelector("#card-my-plano");
    cardMyPlano.style.display = 'flex';

    renderDataCoach(data.user.coach);

    renderDataPlan(data.user.payment_plan, data.user.dias_restantes);
    

}