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
  users.push({ username: username, password: hashedPassword, frase_apoio: frase_apoio, frase_resposta: hashedfraseresposta });

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

  // Seleciona a label da frase de apoio
  var fraseLabel = document.getElementById("fraseLabel");

  // Seleciona o campo de entrada do nome de usuário
  var usernameField = document.getElementById("username");

  // Declara a variável user
  var user;

  // Quando o botão "Esqueceu a senha?" é clicado
  esqueceuSenhaBtn.addEventListener('click', function() {
    // Obtém o valor do campo de entrada do nome de usuário
    var username = usernameField.value;

    // Verifica se o campo de entrada do nome de usuário está vazio
    if (username.trim() === "") {
      alert("Por favor, digite seu nome de usuário antes de prosseguir.");
      return;
    }

    // Obtém os usuários armazenados no localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Busca o usuário correspondente ao nome de usuário fornecido
    user = users.find(function(user) {
      return user.username === username;
    });

    // Verifica se o usuário foi encontrado
    if (!user) {
      alert("Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.");
      return;
    }

    // Exibe a frase de apoio no modal customizado
    fraseLabel.textContent = "Frase de apoio: " + user.frase_apoio;

    // Abre o modal customizado
    modal.style.display = "block";
  });

  // Quando o botão de confirmação é clicado
  document.getElementById("confirmar").addEventListener('click', async function() {
    // Verifica se a variável user está definida
    if (!user) {
      alert("Por favor, clique no botão 'Esqueceu a senha?' e forneça um nome de usuário válido.");
      return;
    }

    // Obtém a resposta fornecida pelo usuário
    var respostaFornecida = document.getElementById("respostaFrase").value;

    console.log("Resposta fornecida pelo usuário:", respostaFornecida);

    // Descriptografa a resposta cadastrada
    var respostaCadastrada = await descriptografar(user.frase_resposta);

    console.log("Resposta cadastrada descriptografada:", respostaCadastrada);

    // Verifica se a resposta fornecida corresponde à resposta cadastrada
    if (respostaFornecida === respostaCadastrada) {
      // Se a resposta estiver correta, você pode permitir que o usuário redefina a senha aqui
      alert("Resposta correta! Agora você pode redefinir sua senha.");
      // Aqui você pode adicionar a lógica para redefinir a senha
    } else {
      // Se a resposta estiver incorreta
      alert("Resposta incorreta. Por favor, tente novamente.");
    }
  });

  // Quando o botão de fechar do modal customizado é clicado
  closeBtn.addEventListener('click', function() {
    // Fecha o modal customizado
    modal.style.display = "none";
  });

  // Quando o usuário clica fora do modal customizado, fecha o modal
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

// Função para descriptografar a resposta cadastrada
async function descriptografar(respostaCifrada) {
  try {
    // Decodifica a resposta cifrada de base64 para bytes
    var cifraBytes = Uint8Array.from(atob(respostaCifrada), c => c.charCodeAt(0));

    // Extrai o IV (Initialization Vector) dos primeiros 12 bytes
    var iv = cifraBytes.slice(0, 12);

    // Extrai o ciphertext (dados cifrados) do restante dos bytes
    var ciphertext = cifraBytes.slice(12);

    // Chave de criptografia
    var chave = "chave_de_criptografia";

    // Converte a chave para bytes usando UTF-8
    var chaveBytes = new TextEncoder().encode(chave);

    // Verifica se a chave tem 128 ou 256 bits
    if (chaveBytes.length !== 16 && chaveBytes.length !== 32) {
      console.error('A chave deve ter 128 ou 256 bits.');
      return null;
    }

    // Importa a chave para uso de descriptografia
    var cryptoKey = await crypto.subtle.importKey(
      "raw", // O tipo de chave é "raw"
      chaveBytes, // A chave de criptografia em bytes
      { name: "AES-GCM", length: 256 }, // Especificações da chave AES
      false, // Não extrair a chave para uso de descriptografia
      ["decrypt"] // Permissões para a chave (apenas para descriptografar)
    );

    // Descriptografa os dados
    var respostaArrayBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv }, // Parâmetros de descriptografia
      cryptoKey, // A chave de descriptografia
      ciphertext // O texto cifrado
    );

    // Converte o ArrayBuffer da resposta para uma string
    var respostaDescriptografada = new TextDecoder().decode(respostaArrayBuffer);

    return respostaDescriptografada;
  } catch (error) {
    console.error('Erro ao descriptografar a resposta:', error);
    return null;
  }
}
  // Restante do código...
});

