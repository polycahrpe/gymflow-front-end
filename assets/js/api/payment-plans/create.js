import { urlBase } from '../../main.js';


export async function createPaymentPlan(dataPlan, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}payment-plans/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dataPlan)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}