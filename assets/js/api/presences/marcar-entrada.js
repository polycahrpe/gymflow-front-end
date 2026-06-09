import { urlBase } from '../../main.js';


export async function marcarEntrada(dataPresenca, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}attendances/entry/mark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dataPresenca)
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