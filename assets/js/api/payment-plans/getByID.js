import { urlBase } from '../../main.js';


export async function getPaymentPlanById(id) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}payment-plans/details/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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