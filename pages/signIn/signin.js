const buttonSignIn = document.querySelector('#button-signIn');
const emailSignIn = document.querySelector('#email-signIn');
const passwordSignIn = document.querySelector('#password-signIn');

let dataUser = {
    email: '',
    password: '',
};

function validateFields() {

    if (emailSignIn.value.trim() === '' || passwordSignIn.value.trim() === '') 
        return alert('Por favor, preencha todos os campos');
    
    return true;

}

buttonSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!validateFields()) return;

    dataUser.email = emailSignIn.value.trim();
    dataUser.password = passwordSignIn.value.trim();

    signIn(dataUser);

});


async function signIn(data) {
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