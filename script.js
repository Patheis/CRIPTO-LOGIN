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

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById('new-username').value;
  var password = document.getElementById('new-password').value;
  
  // Aqui você pode adicionar a lógica para processar o cadastro do usuário
  // Por exemplo, adicionar o novo usuário ao banco de dados ou armazená-lo em localStorage
  // Após o cadastro ser concluído com sucesso, você pode fechar o modal
  modal.style.display = "none";
});

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  // Simulated user authentication
  if (username === 'user' && password === 'password') {
    localStorage.setItem('loggedIn', true);
    window.location.href = 'welcome.html'; // Redirect to welcome page
  } else {
    document.getElementById('message').innerHTML = '<div id="error-message">Usuario incorreto ou senha incorreta</div>';
  }
});
