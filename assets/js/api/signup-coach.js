import { urlBase } from "../main.js";


export async function signupCoach(dataUser) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}coaches/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        });

        if (!response.ok) {

            let errorMessage = 'Erro na requisição';

            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorMessage;
            } catch (e) {}

            if (response.status === 409) {
                throw new Error('EMAIL_EXISTE');
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}