window.onload = function () {
   
  let buttonConnexion = document.querySelector('#buttonClick');
      buttonConnexion.addEventListener("click",function(e){ 
        e.preventDefault();
      let password = document.getElementById("password").value;
      let eMail = document.getElementById("email").value;
      
     

  
      let urlLogin = 'http://localhost:5678/api/users/login';

      
      fetch(urlLogin, {
      
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email: eMail,
        password: password,
        })
      })
      .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      if (data.error) {
        alert("Error Password or Username");
      } else {
        window.open(
          "index.html"
        ); 
      }
    })
    .catch((err) => {
      console.log(err);
    });

      
  });

}