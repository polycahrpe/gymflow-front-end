import { urlBase } from '../../main.js';

export async function getPayment(token) {

    const url = urlBase();

    
    try {
        const response = await fetch(`${url}payments/all`, {
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
    }
}