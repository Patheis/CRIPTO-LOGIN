//modal-cadastra
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalButton");
var span = document.getElementsByClassName("close")[0];



var users = []; // Array para armazenar os usuários cadastrados

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
  var password2 = document.getElementById('new-password2').value;
  var frase_apoio = document.getElementById('frase_apoio').value;
  var frase_resposta = document.getElementById('frase_resposta').value;


  // Verificar se o usuário já existe
  var userExists = users.some(function(user) {
    return user.username === username;
  });

  if (userExists) {
    alert("Erro: Usuário já existe!");
    // Adicione aqui o código para exibir uma mensagem de erro ao usuário
    return;
  }

  // Se o usuário não existir, adicionar ao array de usuários
  users.push({ username: username, password: password });

  console.log("Novo Usuário:");
  console.log("Username:", username);
  console.log("Password:", password);
  console.log("Password2:", password2);
  console.log("Sentece:", frase_apoio);
  console.log("Answer:", frase_resposta);


   // Limpar os campos de entrada
   document.getElementById("new-username").value = "";
   document.getElementById("new-password").value = "";
   document.getElementById("new-password2").value = "";
   document.getElementById("frase_apoio").value = "";
   document.getElementById("frase_resposta").value = "";


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



