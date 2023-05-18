window.onload = function () {
   
  let buttonConnexion = document.querySelector('#loginClick');
  buttonConnexion.addEventListener("click",function(e){ 
    e.preventDefault();
    
    //récuperer la valeur des champs password et email
    let password = document.getElementById("password").value;
    let eMail = document.getElementById("email").value;
    
    //appel fonction changement de couleur si conditions remplis
    changeTheColorOfButton(eMail,password);

    let urlLogin = 'http://localhost:5678/api/users/login';

    fetch(urlLogin, {
    
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
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
        //Appel fonction changement de couleur bouton en cas d'erreur 
        changeTheBkgdColorIfError(eMail,password);

      } else {
        //enregistrer le token
        window.localStorage.setItem('token',data.token)
        window.location.replace("index.html"); 
      }
    });
  });

  //fonction pour afficher le message d'erreur
  function showMessageError(){
    let messageElement = document.getElementsByClassName("message-password");
    messageElement[0].style.display = "block";
  };
  //fonction pour cacher le message d'erreur
  function hideMessageError(){
    let messageElement = document.getElementsByClassName("message-password");
    messageElement[0].style.display = "none";
  };

  //fonction pour changer la couleur du bouton si les conditions sont remplis
  function changeTheColorOfButton(eMail,password) {
    if(eMail && password){
      buttonConnexion.style.background = "#1D6154";
    }else{
      buttonConnexion.style.background = "#b3b3b3";
    }
  };

  //fonction pour changer la couleur bouton en cas d'erreur 
  function changeTheBkgdColorIfError(eMail,password) {
    if(eMail && password){
      buttonConnexion.style.background = "#b3b3b3";
    }
  };
};

