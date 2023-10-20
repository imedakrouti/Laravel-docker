window.addEventListener('DOMContentLoaded', (event) => {
    const overlay = document.getElementById('gradient-overlay');
    const loginBox = document.querySelector('.login-box');
    overlay.addEventListener('animationend', () => {
      overlay.style.display = 'none';
      loginBox.classList.add('show');
    });
  });
  $('#login-form').validate({
    rules: {
      username: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      username: {
        required: "Entrez une nom utilisateur",
        //email: "Please enter a valid email address"
      },
      password: {
        required: "Entrez une mot de passe",
        //minlength: "Your password must be at least 5 characters long"
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.input-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
  
  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var lockIcon = document.getElementById("lockIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        lockIcon.classList.remove("fa-lock");
        lockIcon.classList.add("fa-lock-open");
    } else {
        passwordInput.type = "password";
        lockIcon.classList.remove("fa-lock-open");
        lockIcon.classList.add("fa-lock");
    }
}
 document.getElementById("lockIcon").addEventListener("click", togglePasswordVisibility);