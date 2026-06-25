

function renderCountAluno(alunos) {

    const countAlunoCoach = document.querySelector("#count-aluno-coach")
    countAlunoCoach.textContent =  alunos.length < 10 ? `0${alunos.length}` : alunos.length;

}

function renderListAluno(alunos) {
    
    const listStudentCoach  = document.querySelector("#list-student-coach")

    if (alunos.length === 0) {
        listStudentCoach.innerHTML = "<li>Nenhum aluno ativo encontrado.</li>";
        return;
    } else {
        alunos.forEach(aluno => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="card-img-name">
        
                <div class="img">
                    <div>
                <span>${aluno.nome.charAt(0)}</span>
                    </div>
                </div>
        
                <div class="name">${aluno.nome}</div>
        
                </div>
        
                <div class="card-plan">
                <strong>Email</strong>
                <small> ${aluno.email}</small>
                </div>
        
                <div class="card-state">
                <i class="bi bi-dot"></i>
                ${aluno.dias_restantes} Prazos
                </div>
        
            `;
        
            listStudentCoach.appendChild(listItem);
        });

    }

}




export async function coach(session) {

    renderCountAluno(session.user.alunos)
    renderListAluno(session.user.alunos)
}