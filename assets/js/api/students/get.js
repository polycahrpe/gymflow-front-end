export async function getStudent() {
    
    try {
        const response = await fetch('http://127.0.0.1:8000/student/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();
        console.log(data);

        return data; // opcional, caso queiras usar fora
    } catch (error) {
        console.error('Erro:', error);
    }
}