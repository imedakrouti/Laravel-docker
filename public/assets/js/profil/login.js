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
