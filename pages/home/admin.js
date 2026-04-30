import { getCoach } from "../../assets/js/api/coach/get.js";
import { getStudent } from "../../assets/js/api/students/get.js"


async function listCoaches(token) {

    const listStudentCoachAdmin = document.querySelector("#list-student-coach-admin");    

    try {
        const coaches = await getCoach(token);

        if (!coaches || coaches.length === 0) {
            listStudentCoachAdmin.innerHTML = "<li>Nenhum coach encontrado.</li>";
            return;
        }

        listStudentCoachAdmin.innerHTML = "";

        coaches.forEach(coach => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="card-img-name">

                    <div class="img">
                        <div>
                            <span>${coach.nome.charAt(0)}</span>
                        </div>
                    </div>

                    <div class="name">${coach.nome}</div>

                </div>

                <div class="card-plan">
                    <strong>Especialidade</strong>
                    <small>(${coach.especialidade})</small>
                </div>

                <div class="card-state">
                    <i class="bi bi-dot"></i>
                    3 alunos
                </div>

            `;

            listStudentCoachAdmin.appendChild(listItem);
        });
        
    } catch (error) {
        console.error('Erro ao obter os coaches:', error);
    }
}

async function countStudents(token) {    

    const countStudent = document.querySelector("#count-student");

    try {
        const students = await getStudent(token);

        if (!students || students.length === 0) {
            countStudent.textContent = "00";
            return;
        }

        countStudent.textContent =  students.length < 10 ? `0${students.length}` : students.length;

    } catch (error) {
        console.error('Erro ao obter os coaches:', error);
    }

}






export async function admin(data) {    

    await listCoaches(data.access_token);   
    await countStudents(data.access_token); 

}