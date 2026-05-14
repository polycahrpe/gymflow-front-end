import { urlBase } from '../../main.js';

export async function getAccessCodes(token) {

    const url = urlBase();

    
    try {
        const response = await fetch(`${url}access-codes/all`, {
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

        return data; // opcional, caso queiras usar fora
    } catch (error) {
        console.error('Erro:', error);
    }
}