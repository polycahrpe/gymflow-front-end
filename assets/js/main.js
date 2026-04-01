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



// export function getSession() {

//     return JSON.parse(localStorage.getItem('gymFlowSession')) || {
//       user: {
//         name: "Leo Nahrdo",
//         role: "coach",
//         student: [],
//         token: "..."
//       }
//     };

    
// }



// export function getSession() {

//     return JSON.parse(localStorage.getItem('gymFlowSession')) || {
//       user: {
//         name: "Leo Nahrdo",
//         role: "admin",
//         student: [],
//         token: "..."
//       }
//     };

    
// }