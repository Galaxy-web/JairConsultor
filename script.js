document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário
    const contactForm = document.getElementById("contact-form");

    // Adiciona um ouvinte de evento para o envio do formulário
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtém os valores do formulário
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const entryAmount = document.getElementById("entry-amount").value;
        const installmentAmount = document.getElementById("installment-amount").value;
        const bestDate = document.getElementById("best-date").value;

        // Cria um objeto com os dados do formulário
        const formData = {
            name: name,
            phone: phone,
            entryAmount: entryAmount,
            installmentAmount: installmentAmount,
            bestDate: bestDate,
        };

        // Simula o envio dos dados para a página de acompanhamento (rastreamento.html)
        sendFormDataToTrackingPage(formData);
        
        // Adiciona uma animação de feedback
        animateConfirmation();

        // Limpa o formulário após o envio
        contactForm.reset();
    });

    // Função para enviar dados do formulário para a página de acompanhamento
    function sendFormDataToTrackingPage(formData) {
        // Redireciona para a página de acompanhamento com os parâmetros da URL
        window.location.href = `rastreamento.html?name=${formData.name}&phone=${formData.phone}&entryAmount=${formData.entryAmount}&installmentAmount=${formData.installmentAmount}&bestDate=${formData.bestDate}`;
    }

    // Função para animar uma confirmação visual
    function animateConfirmation() {
        const confirmationMessage = document.createElement("div");
        confirmationMessage.textContent = "Agendamento enviado com sucesso!";
        confirmationMessage.classList.add("confirmation-message");
        document.body.appendChild(confirmationMessage);

        // Remove a mensagem de confirmação após 3 segundos
        setTimeout(() => {
            confirmationMessage.remove();
        }, 3000);
    }

    

    // Restante do código...
});

