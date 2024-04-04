// Função para calcular o hash SHA-256 de uma string
function sha256(message) {
  // Retorna uma Promise que resolve com o resultado do cálculo do hash
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(message)).then(buffer => {
    // Converte o buffer para uma representação hexadecimal
    return Array.prototype.map.call(new Uint8Array(buffer), byte => ('00' + byte.toString(16)).slice(-2)).join('');
  });
}

// Obtendo os usuários do localStorage, se houver
var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Modal de cadastro
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalButton");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  var username = document.getElementById('new-username').value;
  var password = document.getElementById('new-password').value;
  var password2 = document.getElementById('new-password2').value;
  var frase_apoio = document.getElementById('frase_apoio').value;
  var frase_resposta = document.getElementById('frase_resposta').value;

  // Verificar se as senhas coincidem
  if (password !== password2) {
    alert("As senhas não coincidem. Por favor, digite a mesma senha nos dois campos.");
    return;
  }

  // Verificar se o usuário já existe
  var userExists = users.some(function(user) {
    return user.username === username;
  });

  if (userExists) {
    alert("Erro: Usuário já existe!");
    return;
  }

  // Criptografar a senha usando SHA-256
  var hashedPassword = await sha256(password);
  var hashedfrase = await sha256(frase_apoio);
  var hashedfraseresposta = await sha256(frase_resposta);

  // Adicionar novo usuário ao array de usuários
  users.push({ username: username, password: hashedPassword, frase_apoio: frase_apoio, frase_resposta: frase_resposta });

  // Salvar os usuários no localStorage
  localStorage.setItem('users', JSON.stringify(users));

  console.log("Novo Usuário:");
  console.log("Username:", username);
  console.log("Password:", hashedPassword);
  console.log("Sentece:", hashedfrase);
  console.log("Answer:", hashedfraseresposta);

  // Limpar os campos de entrada
  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("new-password2").value = "";
  document.getElementById("frase_apoio").value = "";
  document.getElementById("frase_resposta").value = "";

  modal.style.display = "none";
});

document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  console.log("Login:");
  console.log("Username:", username);
  console.log("Password:", password);

  // Criptografar a senha digitada para comparar com a senha criptografada armazenada
  var hashedPassword = await sha256(password);

  // Verificar se o usuário existe e se a senha está correta
  var user = users.find(function(user) {
    return user.username === username && user.password === hashedPassword;
  });

  if (user) {
    localStorage.setItem('loggedIn', true);
    window.location.href = 'welcome.html';
  } else {
    document.getElementById('message').innerHTML = '<div id="error-message">Usuário incorreto ou senha incorreta</div>';
  }
});
