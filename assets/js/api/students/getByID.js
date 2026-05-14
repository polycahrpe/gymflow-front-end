import { urlBase } from '../../main.js';


export async function getStudentById(id, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}students/details/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}