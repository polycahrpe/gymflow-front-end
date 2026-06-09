import { getSession } from "../../assets/js/main.js";
import { getPayment } from "../../assets/js/api/payments/get.js";
import { deletePayment } from "../../assets/js/api/payments/delete.js";


async function deletePayments(id, token) {

    try {
        const response = await deletePayment(id, token);
        if (response) {
            alert("Pagamento excluído com sucesso!");
            window.location.reload();
        } else {
            alert("Erro ao excluir pagamento.");
        }
    } catch (error) {
        console.error("Error deleting payment:", error);
        alert("Erro ao excluir pagamento.");
    }


}

async function renderPayments(payments) {

    const listPagamentos = document.querySelector("#list-pagamentos");

    listPagamentos.innerHTML = "";

    payments.forEach((payment, index) => {

        const itemPagamento = document.createElement("tr");
        itemPagamento.classList.add("anime-bottom");

        itemPagamento.innerHTML = `
            <td>${payment.student.nome}</td>
            <td>${payment.payment_plan.nome}</td>
            <td>kz ${payment.valor.toFixed(2)}</td>
            <td>${payment.data_pagamento}</td>
            <td>${payment.data_vencimento}</td>
            <td><span class="pago">
                ${payment.status === "pago" ? "Pago" : "Pendente"}
            </span></td>
            <td class="actions">
                
                <button class="delete-btn" data-id="${payment.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        // <a href="./editar/index.html" id="edit-btn" data-id="${payment.id}">
        //     <i class="bi bi-pencil"></i>
        // </a>

        // const editBtn = itemPagamento.querySelector("#edit-btn");

        // editBtn.addEventListener("click", async () => {
        //     // Desabilita o botão
        //     editBtn.disabled = true;

        //     try {
        //         const paymentId = editBtn.getAttribute("data-id");

        //         localStorage.setItem("paymentUpdateId", paymentId);

        //         // Simulação do processo
        //         // await algumaFuncao();

        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         // Reabilita o botão após terminar
        //         editBtn.disabled = false;
        //     }
        // });


        const deleteBtn = itemPagamento.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", async () => {

            const session = getSession();

            if (confirm("Tem certeza que deseja excluir este pagamento?")) {
                await deletePayments(payment.id, session.access_token);
            }
        });

        listPagamentos.appendChild(itemPagamento);
    });

}

async function getPayments(token) {
    try {
        const payments = await getPayment(token);
        return payments;
    } catch (error) {
        console.error("Error fetching payments:", error);
    }
        
}


async function renderAdmin(session) {

    const payments = await getPayments(session.access_token);
    console.log(payments);
    if (payments) {
        renderPayments(payments);
    } else {
        console.error("No payments found.");
    }
    
}


function error404() {
    window.location.href = "../404/index.html";
}


function initPagamentos() {

    const session = getSession();
    const { user } = session;



    switch (user.role) {
        case "admin":
            renderAdmin(session);
            break;
        default:
            error404();
            break;
    }

}

initPagamentos();