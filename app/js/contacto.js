document.addEventListener("DOMContentLoaded", function () {
  // Menú responsive. Se pasó aquí para evitar JavaScript inline en el HTML.
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // Elementos principales del formulario
  const formulario = document.getElementById("contactForm");
  const botonEnviar = document.getElementById("submitBtn");
  const mensajeExito = document.getElementById("formSuccess");

  // Se guardan los campos con su mensaje de error y su función de validación
  const campos = {
    fullname: {
      input: document.getElementById("fullname"),
      error: document.getElementById("fullnameError"),
      validar: validarNombre
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validar: validarCorreo
    },
    phone: {
      input: document.getElementById("phone"),
      error: document.getElementById("phoneError"),
      validar: validarTelefono
    },
    subject: {
      input: document.getElementById("subject"),
      error: document.getElementById("subjectError"),
      validar: validarAsunto
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("messageError"),
      validar: validarMensaje
    }
  };

  // Agrega validación en tiempo real a cada campo
  Object.keys(campos).forEach(function (nombreCampo) {
    const campo = campos[nombreCampo];

    campo.input.addEventListener("input", function () {
      validarCampo(nombreCampo, true);
      revisarFormularioCompleto();
      limpiarMensajeExito();
    });

    campo.input.addEventListener("blur", function () {
      validarCampo(nombreCampo, true);
      revisarFormularioCompleto();
    });
  });

  // Valida el formulario al enviar
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const formularioValido = Object.keys(campos).every(function (nombreCampo) {
      return validarCampo(nombreCampo, true);
    });

    if (!formularioValido) {
      botonEnviar.disabled = true;
      return;
    }

    mensajeExito.textContent = "Mensaje enviado correctamente. Gracias por contactarnos, pronto te responderemos.";
    mensajeExito.classList.add("show");

    formulario.reset();
    limpiarEstadosCampos();
    botonEnviar.disabled = true;
  });

  // Valida un campo específico y muestra su mensaje de error
  function validarCampo(nombreCampo, mostrarMensaje) {
    const campo = campos[nombreCampo];
    const valor = campo.input.value.trim();
    const resultado = campo.validar(valor);

    if (mostrarMensaje) {
      campo.error.textContent = resultado.valido ? "" : resultado.mensaje;

      campo.input.classList.remove("input-error", "input-ok");

      if (valor !== "") {
        campo.input.classList.add(resultado.valido ? "input-ok" : "input-error");
      }
    }

    return resultado.valido;
  }

  // Revisa todos los campos para activar o desactivar el botón
  function revisarFormularioCompleto() {
    const todosValidos = Object.keys(campos).every(function (nombreCampo) {
      return validarCampo(nombreCampo, false);
    });

    botonEnviar.disabled = !todosValidos;
  }

  // Validación del nombre completo mínimo 5 caracteres, solo letras y espacios
  function validarNombre(valor) {
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

    if (valor.length < 5) {
      return {
        valido: false,
        mensaje: "El nombre debe tener mínimo 5 caracteres."
      };
    }

    if (!regexNombre.test(valor)) {
      return {
        valido: false,
        mensaje: "El nombre solo puede contener letras y espacios."
      };
    }

    return { valido: true, mensaje: "" };
  }

  // Validación del correo usando Regex
  function validarCorreo(valor) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(valor)) {
      return {
        valido: false,
        mensaje: "Digite un correo electrónico válido."
      };
    }

    return { valido: true, mensaje: "" };
  }

  // Validación del teléfono solo números y mínimo 8 dígitos
  function validarTelefono(valor) {
    const regexTelefono = /^[0-9]{8,}$/;

    if (!regexTelefono.test(valor)) {
      return {
        valido: false,
        mensaje: "El teléfono debe tener solo números y mínimo 8 dígitos."
      };
    }

    return { valido: true, mensaje: "" };
  }

  // Validación del asunto con mínimo 3 caracteres
  function validarAsunto(valor) {
    if (valor.length < 3) {
      return {
        valido: false,
        mensaje: "El asunto debe tener mínimo 3 caracteres."
      };
    }

    return { valido: true, mensaje: "" };
  }

  // Validación de  mínimo 20 caracteres
  function validarMensaje(valor) {
    if (valor.length < 20) {
      return {
        valido: false,
        mensaje: "El mensaje debe tener mínimo 20 caracteres."
      };
    }

    return { valido: true, mensaje: "" };
  }

  // Limpia estilos y mensajes después de enviar correctamente
  function limpiarEstadosCampos() {
    Object.keys(campos).forEach(function (nombreCampo) {
      const campo = campos[nombreCampo];
      campo.error.textContent = "";
      campo.input.classList.remove("input-error", "input-ok");
    });
  }

  function limpiarMensajeExito() {
    mensajeExito.textContent = "";
    mensajeExito.classList.remove("show");
  }

  revisarFormularioCompleto();
});