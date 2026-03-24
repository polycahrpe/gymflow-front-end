const DEFAULT_LINKS = [
    {
        name: "Início",
        path: "../home/index.html",
        icon: "bi-house"
    },
    {
        name: "Terminar Sessão",
        path: "#",
        icon: "bi-box-arrow-right",
        action: "logout"
    }
];

function renderAdmin() {
    return [
        {
            name: "Início",
            path: "../home/index.html",
            icon: "bi-house"
        },
        {
            name: "Alunos",
            path: "../alunos/index.html",
            icon: "bi-people",
            badge: "alertas"
        },
        {
            name: "Planos",
            path: "../planos/index.html",
            icon: "bi-calendar3"
        },
        {
            name: "Treinos",
            path: "../treinos/index.html",
            icon: "bi-trophy",
            badge: "pagamentos"
        },
        {
            name: "Pagamentos",
            path: "../pagamentos/index.html",
            icon: "bi-credit-card-2-front",
            badge: "pagamentos"
        },
        {
            name: "Coach",
            path: "../coach/index.html",
            icon: "bi-person-plus"
        },
        {
            name: "Presenças",
            path: "../presenca/index.html",
            icon: "bi-calendar2-check"
        },
        {
            name: "Terminar Sessão",
            path: "#",
            icon: "bi-box-arrow-right",
            action: "logout"
        }
    ];
}

function renderCoach() {
    return [
        {
            name: "Início",
            path: "../home/index.html",
            icon: "bi-house"
        },
        {
            name: "Meus Alunos",
            path: "../alunos/index.html",
            icon: "bi-people"
        },
        {
            name: "Presenças",
            path: "../presenca/index.html",
            icon: "bi-calendar2-check"
        },
        {
            name: "Treinos",
            path: "../treinos/index.html",
            icon: "bi-trophy"
        },
        {
            name: "Terminar Sessão",
            path: "#",
            icon: "bi-box-arrow-right",
            action: "logout"
        }
    ];
}

function renderStudent() {
    return [
        {
            name: "Início",
            path: "../home/index.html",
            icon: "bi-house"
        },
        {
            name: "Meu Treino",
            path: "../treinos/index.html",
            icon: "bi-trophy"
        },
        {
            name: "Terminar Sessão",
            path: "#",
            icon: "bi-box-arrow-right",
            action: "logout"
        }
    ];
}

export function getDashboardLinksByRole(role) {
    switch (role) {
        case "admin":
            return renderAdmin();
        case "coach":
            return renderCoach();
        case "student":
        case "aluno":
            return renderStudent();
        default:
            return DEFAULT_LINKS;
    }
}
