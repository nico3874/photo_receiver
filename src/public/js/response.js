const btnSubmit = document.getElementById('btnSubmit')
const form = document.getElementById('upload-form');
let loadingOverlay = document.getElementById('loading-overlay')


form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  loadingOverlay.style.display = 'flex'
  if (form.checkValidity()) {
    
    const formData = new FormData(form);

    fetch('/upload-images', {
      method: 'POST',
      body: formData
    }).then(response=> {
      if (!response.ok) {
        alert("No se puede conectar con el servicio, refresque la página y vuelva a intentar.")
        
        
      }
      return response
    
  }).then(data=>{
    console.log(data.status)
    data.status==200 && (loadingOverlay.style.display = 'none', alert('Las imagenes se subieron correctamente'))
    data.status==401 && (loadingOverlay.style.display = 'none', alert('Solo admite imágenes'))
    
    (data.status != 200 && data.status != 401) && (loadingOverlay.style.display = 'none', alert('Las imagenes no pudieron enviarse'))
   
    location.reload()
    
    
    
  })
  }else{
    alert('Todos los campos son obligatorios')
  }
});

btnSubmit.addEventListener('click', function() {
  form.reportValidity(); // Verifica la validez del formulario y muestra los mensajes de error si los campos requeridos no están completos
});

