document.addEventListener("DOMContentLoaded", function () {
    // Ouvinte de evento para clicar nos links do cabeçalho
    document.querySelectorAll('nav a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove a classe 'active' de todos os links
            document.querySelectorAll('nav a').forEach(function(navLink) {
                navLink.classList.remove('active');
            });

            // Adiciona a classe 'active' ao link clicado
            link.classList.add('active');

            // Obtém o valor do href do link clicado (por exemplo, '#imoveis')
            const targetSectionId = link.getAttribute('href').substring(1);

            // Oculta todas as seções
            document.querySelectorAll('section').forEach(function(section) {
                section.style.display = 'none';
            });

            // Exibe apenas a seção alvo
            document.getElementById(targetSectionId).style.display = 'block';
        });
    });
});
