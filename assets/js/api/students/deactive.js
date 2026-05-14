import { urlBase } from "../../main.js";

export async function deactive(id, token) {

    const url = urlBase();
    
    try {
        const response = await fetch(`${url}students/deactivate/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            let errorMessage = 'Erro na requisição';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorMessage;
            } catch (e) {}
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}