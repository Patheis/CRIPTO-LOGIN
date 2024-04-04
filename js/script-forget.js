import { users } from './scripts.js';

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var fraseApoio = document.getElementById("frase_apoio").value;
  var fraseResposta = document.getElementById("frase_resposta").value;

  var user = users.find(function(user) {
    return user.username === username && user.fraseApoio === fraseApoio && user.fraseResposta === fraseResposta;
  });

  if (user) {
    alert("Usuário verificado com sucesso! Agora você pode redefinir a senha.");
    document.getElementById("resetPasswordModal").style.display = "block";
  } else {
    alert("Usuário não encontrado ou informações incorretas. Por favor, verifique seus dados e tente novamente.");
  }

  // Limpar os campos de entrada
  document.getElementById("username").value = "";
  document.getElementById("frase_apoio").value = "";
  document.getElementById("frase_resposta").value = "";
});

document.getElementById("reset-password-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var newPassword = document.getElementById("new-password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  if (newPassword !== confirmPassword) {
    alert("As senhas não coincidem. Por favor, digite a mesma senha nos dois campos.");
    return;
  }

  if (newPassword === "") {
    alert("Por favor, insira uma nova senha.");
    return;
  }

  // Lógica para redefinir a senha do usuário
  // Aqui você pode adicionar a lógica para redefinir a senha do usuário
  // e exibir uma mensagem de sucesso após a redefinição

  alert("Senha redefinida com sucesso!");
});

document.getElementById("closeResetPasswordModal").addEventListener("click", function() {
  document.getElementById("resetPasswordModal").style.display = "none";
});
