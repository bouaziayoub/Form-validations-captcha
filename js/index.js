// Autor: Ayoub Bouazi
// Cargar captcha al cargar la página

window.onload = generateNewCaptcha();

// FORMULARIO
const formSubmit = document.getElementById("formData");

// INPUTS
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const emailConfirm = document.getElementById("emailConfirm");
const dni = document.getElementById("dni");

// ERROR MSG
const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorEmailConfirm = document.getElementById("errorEmailConfirm");
const errorDNI = document.getElementById("errorDNI");
const rgpdError = document.getElementById("rgpdError");

// Evento submit del formulario
formSubmit.addEventListener("submit", function (event) {
  // Cancelar el envío del formulario
  event.preventDefault();

  // Validar el nombre
  validateNombre();

  // Validar el email
  validateEmail();

  // Validar el emailConfirm
  validateEmailConfirm();

  // Validar el DNI
  validateDNI();

  // Validar RGPD
  validateRGPD();
  if (
    validateNombre() &&
    validateEmail() &&
    validateEmailConfirm() &&
    validateDNI() &&
    validateRGPD()
  ) {
    alert("Formulario enviado correctamente");
  }
});

// REGEX
const letras = [
  "T",
  "R",
  "W",
  "A",
  "G",
  "M",
  "Y",
  "F",
  "P",
  "D",
  "X",
  "B",
  "N",
  "J",
  "Z",
  "S",
  "Q",
  "V",
  "H",
  "L",
  "C",
  "K",
  "E",
];
const expresionDNI = /^[xyzXYZ]?(\d{7,8}[a-zA-Z])$/;
const expresionNombre = /^[a-zA-ZñÑ]{2,40}$/;
const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Validar Nombre
function validateNombre() {
  if (nombre.value === "") {
    errorNombre.style.display = "block";
    errorNombre.innerText = "Nombre es obligatorio";
  } else if (!expresionNombre.test(nombre.value)) {
    errorNombre.style.display = "block";
    errorNombre.innerText = "Nombre debe tener entre 2 y 40 caracteres";
  } else {
    errorNombre.style.display = "none";
  }
}

// Validar DNI
function validateDNI() {
  if (dni.value === "") {
    errorDNI.style.display = "block";
    errorDNI.innerText = "DNI es obligatorio";
  } else if (!expresionDNI.test(dni.value)) {
    dni.value = "";
    errorDNI.style.display = "block";
    errorDNI.innerText = "Formato DNI Erroneo";
    console.log("error dni");
  } else {
    let numero = dni.value;
    numero = numero.toUpperCase();
    let numeroDNI = numero.match(/\d+/);
    let letraDNI = numero[numero.length - 1];
    let letraReal = letras[parseInt(numeroDNI) % 23];
    if (letraDNI != letraReal) {
      dni.value = "";
      errorDNI.style.display = "block";
      errorDNI.innerText = "Letra incorrecta";
      console.log("error dni");
    } else {
      // errorDni = false;
      errorDNI.style.display = "none";
      console.log("dni correcto");
      dni.style.backgroundColor = "lightgreen";
      return true;
    }
  }
}

// Validar email
function validateEmail() {
  if (email.value === "") {
    errorEmail.style.display = "block";
    errorEmail.innerText = "Email es obligatorio";
  } else if (!expresionEmail.test(email.value)) {
    email.value = "";
    errorEmail.style.display = "block";
    errorEmail.innerText = "Email incorrecto";
  } else {
    errorEmail.style.display = "none";
    return true;
  }
}

// Validar emailConfirm
function validateEmailConfirm() {
  if (email.value !== emailConfirm.value) {
    emailConfirm.value = "";
    errorEmailConfirm.style.display = "block";
    errorEmailConfirm.innerText = "Emails no coinciden";
  } else {
    errorEmailConfirm.style.display = "none";
    return true;
  }
}

// validate RGPD
function validateRGPD() {
  const rgpd = document.getElementById("rgpd");
  if (!rgpd.checked) {
    rgpdError.style.display = "block";
    rgpdError.innerText = "Debes aceptar la RGPD";
  } else {
    rgpdError.style.display = "none";
    return true;
  }
}

// Generar y validar una captcha
function generateNewCaptcha() {
  // Obtener el canvas y su contexto
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");

  // Generar captcha
  let generatedCaptcha = Math.random().toString(36).substring(7);

  // Definir colores, fuentes y estilos
  const fontFamily = [
    "Whisper",
    "Arial",
    "Verdana",
    "Tahoma",
    "Impact",
    "Courier New",
  ];

  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar líneas de fondo
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
    ctx.stroke();
  }

  // Calcular el ancho total del texto generado
  let totalWidth = 0;
  for (let i = 0; i < generatedCaptcha.length; i++) {
    const letter = generatedCaptcha[i];
    ctx.font = `${Math.random() * 2 + 1}rem ${
      fontFamily[Math.floor(Math.random() * fontFamily.length)]
    }`;
    totalWidth += ctx.measureText(letter).width + 10; // Agregar un espacio entre letras
  }

  // Centrar el texto horizontalmente
  let x = (canvas.width - totalWidth) / 2;
  const y = canvas.height / 2;

  // Dibujar cada letra del captcha en el canvas
  for (let i = 0; i < generatedCaptcha.length; i++) {
    const letter = generatedCaptcha[i];

    ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
    ctx.font = `${Math.random() * 2 + 2}rem ${
      fontFamily[Math.floor(Math.random() * fontFamily.length)]
    }`;
    ctx.fontStyle = `${Math.random() > 0.5 ? "italic" : "normal"}`;

    // Aplicar rotación aleatoria a algunas letras
    if (Math.random() > 0.5) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(((Math.random() - 0.5) * Math.PI) / 4); // Rotación aleatoria entre -π/4 y π/4 radianes
      ctx.fillText(letter, -ctx.measureText(letter).width / 2, 0);
      ctx.restore();
    } else {
      ctx.fillText(letter, x, y);
    }

    // Incrementar la posición x para la siguiente letra
    x += ctx.measureText(letter).width + 10; // Agregar un espacio entre letras
  }
  // Validar captcha
  const captchaInput = document.getElementById("captcha");
  captchaInput.addEventListener("input", function () {
    const captcha = captchaInput.value.trim();
    if (captcha === "") {
      captchaInput.style.backgroundColor = "lightcoral";
      return false;
    } else if (captcha === generatedCaptcha) {
      captchaInput.style.backgroundColor = "lightgreen";
      return true;
    } else {
      captchaInput.style.backgroundColor = "lightcoral";
      return false;
    }
  });
}

