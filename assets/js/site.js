import { getPaymentPlan } from "../js/api/payment-plans/get.js"


async function getPaymentPlanAPI() {
    
    const response = await getPaymentPlan()

    const ul = document.querySelector("#planos")
    
    response.forEach(plan => {

        const li = document.createElement("li")
        li.classList.add("plano-card")

        li.innerHTML = `
            <h3>${plan.nome}</h3>
            <p class="plano-valor">${plan.preco}</p>
            
            <button>
                <i class="bi bi-chevron-down"></i>
            </button>
        `
        
        ul.appendChild(li)
        
    });

}

await getPaymentPlanAPI()