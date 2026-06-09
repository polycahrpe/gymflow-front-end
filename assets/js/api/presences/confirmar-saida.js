import { urlBase } from '../../main.js';


export async function confirmarSaidaPatch(idPresenca, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}attendances/exit/confirm/${idPresenca}`, {
            method: 'PATCH',
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