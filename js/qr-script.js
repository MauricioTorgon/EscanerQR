document.getElementById('start-scan').addEventListener('click', () => {
    // Ocultar bienvenida, mostrar lector
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('reader-wrapper').style.display = 'flex';
  
    // Iniciar lector
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 20
    });
  
    scanner.render(onScanSuccess, onScanError);
  });
  
  function onScanSuccess(result) {
    const resEl = document.getElementById('result');
    resEl.innerHTML = `
      <h2>¡Escaneo exitoso!</h2>
      <p><a href="${result}">${result}</a></p>
    `;
    // Detener y limpiar
    Html5Qrcode.getCameras() // opcional: parar antes
      .then(_ => scanner.clear());
  }
  
  function onScanError(err) {
    console.warn('Error de escaneo:', err);
  }
  