document.getElementById('start-scan').addEventListener('click', () => {
  document.getElementById('welcome-container').style.display = 'none';
  document.getElementById('reader-wrapper').style.display = 'flex';

  const scanner = new Html5QrcodeScanner('reader', {
    qrbox: { width: 250, height: 250 },
    fps: 20
  });

  scanner.render(handleScanSuccess, handleScanError);

  // Lo guardamos global para poder pararlo después
  window.qrScanner = scanner;
});

function getHoraActual() {
  const now = new Date();
  return now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

function handleScanSuccess(decodedText) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === decodedText);

  const messageBox = document.getElementById('scan-message');

  if (!user) {
    messageBox.textContent = "⚠️ Usuario no reconocido.";
    return;
  }

  let registros = JSON.parse(localStorage.getItem('registros')) || [];

  const hoy = new Date().toLocaleDateString('es-MX'); // para distinguir días
  let registro = registros.find(r => r.username === user.username && r.fecha === hoy);

  if (!registro) {
    // Primera vez: guardar entrada
    registros.push({
      username: user.username,
      matricula: user.matricula,
      nombre: user.fullname,
      fecha: hoy,
      entrada: getHoraActual(),
      salida: ''
    });
    messageBox.textContent = `✅ Entrada registrada para ${user.fullname}`;
  } else if (!registro.salida) {
    // Ya tiene entrada pero no salida
    registro.salida = getHoraActual();
    messageBox.textContent = `✅ Salida registrada para ${user.fullname}`;
  } else {
    // Ya tiene entrada y salida
    messageBox.textContent = `✅ Ya se registraron entrada y salida para hoy.`;
  }

  localStorage.setItem('registros', JSON.stringify(registros));

  // para detener el escaneo después de leer:
  window.qrScanner.clear();
}

function handleScanError(error) {
  console.warn("Error escaneando:", error);
}
