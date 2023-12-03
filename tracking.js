document.addEventListener("DOMContentLoaded", function () {
    // Array para armazenar dados de agendamentos
    let appointmentsData = [];

    // Função para adicionar uma linha à tabela de rastreamento
    function addTableRow(formData, status) {
        const trackingTable = document.getElementById("tracking-table").getElementsByTagName('tbody')[0];

        const row = trackingTable.insertRow();
        row.insertCell(0).textContent = formData.name;
        row.insertCell(1).textContent = formData.phone;
        row.insertCell(2).textContent = formData.entryAmount;
        row.insertCell(3).textContent = formData.installmentAmount;
        row.insertCell(4).textContent = formData.bestDate;
        row.insertCell(5).textContent = status;
    }

    // Função para atualizar o gráfico de contagem
    function updateChart() {
        const statusChartCanvas = document.getElementById("status-chart");
        const statusChartCtx = statusChartCanvas.getContext("2d");

        const statusCounts = countStatuses(appointmentsData);
        const statusLabels = Object.keys(statusCounts);
        const statusData = Object.values(statusCounts);

        const statusChart = new Chart(statusChartCtx, {
            type: "bar",
            data: {
                labels: statusLabels,
                datasets: [{
                    label: "Contagem de Status",
                    data: statusData,
                    backgroundColor: ["#2ecc71", "#e74c3c"],
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 0,
                    },
                },
            },
        });
    }

    // Função para contar os diferentes status na lista de agendamentos
    function countStatuses(appointments) {
        return appointments.reduce(function (acc, appointment) {
            acc[appointment.status] = (acc[appointment.status] || 0) + 1;
            return acc;
        }, {});
    }

    // Função para atualizar a lista de agendamentos e o gráfico
    function updateTracking(formData, status) {
        appointmentsData.push({ ...formData, status });
        addTableRow(formData, status);
        updateChart();
    }

    // Botão "Visita Agendada"
    const scheduledButton = document.createElement("button");
    scheduledButton.textContent = "Visita Agendada";
    scheduledButton.classList.add("green-button");
    scheduledButton.addEventListener("click", function () {
        appointmentsData.pop(); // Remove o último agendamento, pois foi marcado como "Sem Retorno"
        updateChart();
        resetTracking();
    });

    // Botão "Sem Retorno"
    const noReturnButton = document.createElement("button");
    noReturnButton.textContent = "Sem Retorno";
    noReturnButton.classList.add("red-button");
    noReturnButton.addEventListener("click", function () {
        const lastAppointment = appointmentsData.pop();
        lastAppointment.status = "Sem Retorno";
        updateChart();
        resetTracking();
    });

    // Função para reiniciar a lista de agendamentos e a tabela
    function resetTracking() {
        appointmentsData = [];
        const trackingTableBody = document.getElementById("tracking-table").getElementsByTagName('tbody')[0];
        trackingTableBody.innerHTML = "";
    }

    // Adiciona os botões à seção de acompanhamento
    const trackingSection = document.getElementById("tracking-section");
    trackingSection.appendChild(scheduledButton);
    trackingSection.appendChild(noReturnButton);

    // Inicializa o gráfico com uma contagem vazia
    updateChart();
});

