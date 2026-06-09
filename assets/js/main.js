export function getSession() {

    return JSON.parse(localStorage.getItem('gymFlowSession')) || {
      user: {
        name: "Leo Nahrdo",
        role: "admin",
        student: [],
        token: "...",
        WeeklyFrequency: [
            { day: "Segunda", presence: 40 },
            { day: "Terça", presence: 65 },
            { day: "Quarta", presence: 30},
            { day: "Quinta", presence: 45 },
            { day: "Sexta", presence: 50 },
            { day: "Sábado", presence: 80 },
            { day: "Domingo", presence: 35 },
        ]

      }
    };

    
}

export function urlBase() {

    const url = "http://127.0.0.1:8000/"

    return url;

}

export function validateName(name) {

    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (!nameRegex.test(name.trim())) 
        return false;

    return true;

}

export function validateEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) 
        return false;

    return true;

}