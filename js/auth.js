// Arreglo temporal para guardar usuarios registrados
const users = [];

// Registro: crea un usuario y redirige a login
function registerUser(event) {
    event.preventDefault();
    const username  = document.getElementById('reg-username').value.trim();
    const matricula = document.getElementById('reg-matricula').value.trim();
    const fullname  = document.getElementById('reg-fullname').value.trim();
    const password  = document.getElementById('reg-password').value;
  
    if (!username || !matricula || !fullname || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Obtener usuarios almacenados y convertirlos a objeto
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    if (users.find(u => u.username === username)) {
      alert('El usuario ya existe. Elige otro nombre.');
      return;
    }
  
    // Guardar usuario en localStorage
    users.push({ username, matricula, fullname, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'index.html';
  }
  
// Login: comprueba credenciales o redirige a registro
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('log-username').value.trim();
    const password = document.getElementById('log-password').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      alert(`¡Bienvenido, ${user.fullname}!`);
      window.location.href = 'bienvenida.html';
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
  
// Asociar eventos cuando cargue cada página
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', loginUser);
  }
  if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', registerUser);
  }
});
