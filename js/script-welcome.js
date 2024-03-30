// Seleciona o modal de solicitação de senha
var adminSenhaModal = document.getElementById("adminSenhaModal");

// Seleciona o botão que abre o modal
var adminModalButton = document.getElementById("adminModal");

// Seleciona o botão de fechar do modal
var closeAdminModalButton = adminSenhaModal.querySelector(".close");



function logout() {
    localStorage.removeItem('loggedIn'); // Remove a marcação de login
    window.location.href = 'index.html'; // Redireciona para a página de login
  }
  
// Adiciona um evento de clique ao botão que abre o modal
adminModalButton.addEventListener("click", function() {
  adminSenhaModal.style.display = "block"; // Exibe o modal quando o botão é clicado
});

// Adiciona um evento de clique ao botão de fechar do modal
closeAdminModalButton.addEventListener("click", function() {
  adminSenhaModal.style.display = "none"; // Fecha o modal quando o botão de fechar é clicado
});

// Adiciona um evento de clique fora do modal para fechá-lo
window.addEventListener("click", function(event) {
  if (event.target === adminSenhaModal) {
    adminSenhaModal.style.display = "none"; // Fecha o modal se o clique ocorrer fora da área do modal
  }
});

// Adiciona um evento de envio ao formulário dentro do modal
var adminPasswordForm = document.getElementById("admin-password-form");
adminPasswordForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio do formulário (comportamento padrão)

  // Obtém o valor da senha do administrador
  var adminPassword = document.getElementById("admin-password").value;

  // Verifica se a senha do administrador está correta (você pode substituir "admin123" pela senha real)
  if (adminPassword === "admin123") {
    // Aqui você pode adicionar o código para exibir o relatório de usuários
    alert("Senha correta. Exibindo relatório de usuários.");
  } else {
    alert("Senha incorreta. Acesso negado."); // Exibe uma mensagem de erro se a senha estiver incorreta
  }

  // Limpa o campo de senha após a tentativa de envio
  document.getElementById("admin-password").value = "";
// Após a declaração do array de usuários
var userListContainer = document.getElementById("user-list");

// Função para exibir todos os usuários cadastrados
function displayUsers() {
  // Limpar conteúdo anterior, se houver
  userListContainer.innerHTML = '';

  // Iterar sobre todos os usuários e exibir detalhes
  users.forEach(function(user, index) {
    var userListItem = document.createElement("li");
    userListItem.textContent = "Usuário " + (index + 1) + ": " + user.username;
    userListContainer.appendChild(userListItem);
  });
}


// Chame a função para exibir os usuários ao carregar a página
displayUsers();

});
