var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalButton");
var span = document.getElementsByClassName("close")[0];
var users = []; // Array para armazenar os usuários cadastrados


function logout() {
  localStorage.removeItem('loggedIn'); // Remove a marcação de login
  window.location.href = 'index.html'; // Redireciona para a página de login
}


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

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById('new-username').value;
  var password = document.getElementById('new-password').value;

  // Verificar se o usuário já existe
  var userExists = users.some(function(user) {
    return user.username === username;
  });

  if (userExists) {
    console.log("Erro: Usuário já existe!");
    // Adicione aqui o código para exibir uma mensagem de erro ao usuário
    return;
  }

  // Se o usuário não existir, adicionar ao array de usuários
  users.push({ username: username, password: password });

  console.log("Novo Usuário:");
  console.log("Username:", username);
  console.log("Password:", password);
  
  modal.style.display = "none";
});

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  console.log("Login:");
  console.log("Username:", username);
  console.log("Password:", password);

  // Aqui você pode adicionar a lógica para criptografar a senha, se necessário
  
  // Verificar se o usuário existe e se a senha está correta
  var user = users.find(function(user) {
    return user.username === username && user.password === password;
  });

  if (user) {
    localStorage.setItem('loggedIn', true);
    window.location.href = 'welcome.html'; 
  } else {
    document.getElementById('message').innerHTML = '<div id="error-message">Usuário incorreto ou senha incorreta</div>';
  }
});
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
