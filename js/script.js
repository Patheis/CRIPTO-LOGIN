// Função para calcular o hash SHA-256 de uma string
function sha256(message) {
  // Retorna uma Promise que resolve com o resultado do cálculo do hash
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(message)).then(buffer => {
    // Converte o buffer para uma representação hexadecimal
    return Array.prototype.map.call(new Uint8Array(buffer), byte => ('00' + byte.toString(16)).slice(-2)).join('');
  });
}


// Inicializa a variável loginAttempts se ainda não estiver definida
if (!localStorage.getItem('loginAttempts')) {
  localStorage.setItem('loginAttempts', 0);
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
  var email = document.getElementById('email').value;

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
  users.push({ username: username, password: hashedPassword, frase_apoio: frase_apoio, frase_resposta: frase_resposta, email: email });

  // Salvar os usuários no localStorage
  localStorage.setItem('users', JSON.stringify(users));

  console.log("Novo Usuário:");
  console.log("Username:", username);
  console.log("Password:", hashedPassword);
  //so no console aparece
  console.log("Sentece:", hashedfrase);
  console.log("Answer:", hashedfraseresposta);
  console.log("Answer:", email);

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
      // Incrementar o número de tentativas de login
      incrementAttempts();

      // Verificar se excedeu o número máximo de tentativas
      if (getAttempts() >= 3) {
          // Excedeu o número máximo de tentativas
          document.getElementById('message').innerHTML = '<div id="error-message">Você excedeu o número máximo de tentativas. Por favor, redefina sua senha.</div>';
          // Aqui você pode adicionar a lógica para redefinir a senha do usuário
      } else {
          // Ainda há tentativas restantes
          document.getElementById('message').innerHTML = '<div id="error-message">Usuário incorreto ou senha incorreta</div>';
      }
  }
});

// Função para obter o número de tentativas de login armazenadas no localStorage
function getAttempts() {
  var attempts = localStorage.getItem('loginAttempts');
  return attempts ? parseInt(attempts) : 0;
}

// Função para incrementar o número de tentativas de login e armazená-lo no localStorage
function incrementAttempts() {
  var attempts = getAttempts();
  attempts++;
  localStorage.setItem('loginAttempts', attempts);
}


document.addEventListener('DOMContentLoaded', function() {
  // Seleciona o botão "Esqueceu a senha?"
  var esqueceuSenhaBtn = document.querySelector('.esqueceu-button');

  // Seleciona o modal customizado
  var modal = document.getElementById("customModal");

  // Seleciona o botão de fechar do modal customizado
  var closeBtn = document.querySelector('.close2');

  // Seleciona a label da frase de apoio e a label de email mascarado
  var fraseLabel = document.getElementById("fraseLabel");
  var emailLabel = document.getElementById("emailLabel");

  // Seleciona o campo de entrada do nome de usuário
  var usernameField = document.getElementById("username");

  // Declara a variável user
  var user;

  // Função para mascarar o email
  function maskEmail(email) {
    var parts = email.split('@');
    var localPart = parts[0];
    var maskedLocal = localPart[0] + '*'.repeat(Math.max(0, localPart.length - 2)) + (localPart.length > 1 ? localPart[localPart.length - 1] : '');
    return maskedLocal + '@' + parts[1];
  }

  // Função para validar a senha forte
  function isPasswordStrong(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  }

  // Quando o botão "Esqueceu a senha?" é clicado
  esqueceuSenhaBtn.addEventListener('click', function() {
    var username = usernameField.value;
    if (username.trim() === "") {
      alert("Por favor, digite seu nome de usuário antes de prosseguir.");
      return;
    }
    var users = JSON.parse(localStorage.getItem('users')) || [];
    user = users.find(user => user.username === username);
    if (!user) {
      alert("Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.");
      return;
    }
    fraseLabel.textContent = "Frase de apoio: " + user.frase_apoio;
    emailLabel.textContent = "Email mascarado: " + maskEmail(user.email);
    modal.style.display = "block";
  });

  // Quando o botão de confirmação é clicado
  document.getElementById("confirmar").addEventListener('click', async function() {
    if (!user) {
      alert("Por favor, clique no botão 'Esqueceu a senha?' e forneça um nome de usuário válido.");
      return;
    }
    var respostaFornecida = document.getElementById("respostaFrase").value;

    if (respostaFornecida === user.frase_resposta) {
      var novaSenha;
      do {
        novaSenha = prompt("Digite sua nova senha (deve ter pelo menos 8 caracteres, incluir letras maiúsculas, minúsculas e números):");
        if (novaSenha && isPasswordStrong(novaSenha)) {
          var senhaCriptografada = await sha256(novaSenha);
          user.password = senhaCriptografada;
          var users = JSON.parse(localStorage.getItem('users'));
          var index = users.findIndex(u => u.username === user.username);
          users[htmlindex] = user;
          localStorage.setItem('users', JSON.stringify(users));
          console.log("Nova senha criptografada: ", senhaCriptografada);
          alert("Senha atualizada com sucesso! \n Pressione F5 e tente fazer o acesso ao sistema!");
          modal.style.display = "none";
          break;
        } else if (!novaSenha) {
          alert("Atualização de senha cancelada.");
          break;
        } else {
          alert("A senha não atende aos requisitos mínimos de segurança.");
        }
      } while (true);
    } else {
      alert("Resposta incorreta. Por favor, tente novamente.");
    }
  });

  // Quando o botão de fechar do modal customizado é clicado
  closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
  });

  // Quando o usuário clica fora do modal customizado, fecha o modal
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });





});



















