import { urlBase } from '../../main.js';


export async function deletePaymentPlan(id, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}payment-plans/delete/${id}`, {
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
        console.log(data);

        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}