import { urlBase } from '../../main.js';

export async function deletePayment(id, token) {

    const url = urlBase();

    
    try {
        const response = await fetch(`${url}payments/delete/${id}`, {
            method: 'DELETE',
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