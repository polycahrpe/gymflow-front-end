import { urlBase } from '../../main.js';


export async function deleteStudent(id, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}students/delete/${id}`, {
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