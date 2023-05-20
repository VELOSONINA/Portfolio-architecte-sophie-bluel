window.onload = function () {
   
  let buttonConnexion = document.querySelector('#loginClick');
  buttonConnexion.addEventListener("click",function(e){ 
    e.preventDefault();
    
    //récuperer la valeur des champs password et email
    let password = document.getElementById("password").value;
    let eMail = document.getElementById("email").value;
    
    //appel fonction changement de couleur si conditions remplis
    if (!checkMailAndPassword(eMail,password)){
      showMessageError("block");
      return ;
    };

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
        showMessageError("block");
        //Appel fonction changement de couleur bouton gris 
        changeTheBkgdColor("#b3b3b3");

      } else {
        //Appel fonction changement de couleur bouton vert
        changeTheBkgdColor("#1D6154");
        //enregistrer le token
        window.localStorage.setItem('token',data.token)
        window.location.replace("index.html"); 
      }
    });
  });

  //fonction pour afficher le message d'erreur
  //fonction pour afficher le message d'erreur
  function showMessageError(displayString){
    let messageElement = document.getElementsByClassName("message-password");
    messageElement[0].style.display = displayString;
    //cacher le message d'erreur
    setTimeout(function() {
      messageElement[0].style.display = "none";
    }, 1000);
  };


  //fonction changer la couleur du bouton si les conditions sont remplis,
  //en vert ("#1D6154") ou gris ("#b3b3b3")
  function checkMailAndPassword(eMail,password) {
    if(eMail && password){
      return true;
    };
    return false
  };

  //fonction pour changer la couleur bouton en cas d'erreur 
  function changeTheBkgdColor(backgroundColor) {
    buttonConnexion.style.background = backgroundColor;
  };
};

