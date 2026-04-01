import { getSession } from "../../../assets/js/main.js";


async function createPaymentPlan() {

    try {
        const response = await fetch('http://127.0.0.1:8000/coach/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data)
        });

        console.log(response);
        

        // if (!response.ok) {
        //     const errorData = await response.json().catch(() => null);
        //     console.error('Erro na API:', errorData || response.statusText);
        //     alert('Credenciais inválidas ou erro no servidor.');
        //     return;
        // }

        // const result = await response.json();
        // console.log('Login OK:', result);

        // aqui você pode guardar token e redirecionar:
        // localStorage.setItem('token', result.access_token);
        // window.location.href = '../dashboard/index.html';

    } catch (error) {
        // console.error('Erro:', error);
        // alert('Erro ao iniciar sessão');
    }

}


function renderAdmin() {


}


function error404() {
    window.location.href = "../../404/index.html";
}


function initNovoPlanos() {

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

initNovoPlanos();