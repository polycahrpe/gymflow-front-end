async function getStudents() {
            try {
                const response = await fetch('https://gymflow-api/students', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                document.getElementById('resultado').innerHTML = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Erro:', error);
                document.getElementById('resultado').innerHTML = 'Erro ao buscar dados';
            }
        }

    