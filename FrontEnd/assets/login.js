window.onload = function () {
   
  let buttonConnexion = document.querySelector('#loginClick');
  buttonConnexion.addEventListener("click",function(e){ 
    e.preventDefault();
    let password = document.getElementById("password").value;
    let eMail = document.getElementById("email").value;
    
    let urlLogin = 'http://localhost:5678/api/users/login';

    fetch(urlLogin, {
    
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: eMail,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error || data.message) {
        //afficher le message d'erreur
        showMessageError();
        //cacher le message d'erreur
        setTimeout(function() {
          hideMessageError();
        }, 5000);
      } else {
        window.open("index.html"); 
      }
    });
  });

  //fonction pour afficher le message d'erreur
  function showMessageError(){
    let messageElement = document.getElementsByClassName("message-password");
    messageElement[0].style.display = "block";
  }
  //fonction pour cacher le message d'erreur
  function hideMessageError(){
    let messageElement = document.getElementsByClassName("message-password");
    messageElement[0].style.display = "none";
  }

};