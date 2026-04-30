import { urlBase } from '../../main.js';

export async function updatePaymentPlan(id, data, token) {

    const url = urlBase();

    try {
        const response = await fetch(`${url}payment-plans/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        return await response.json();

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}