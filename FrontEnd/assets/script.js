window.onload = function () {

    let buttonConnexion = document.querySelector('buttonClick');
        buttonConnexion.addEventListener("click",function(){ 
            console.log("se connecter") 
        });

    const portfolioUrl = 'http://localhost:5678/api/works';
    
    fetch(portfolioUrl)
        .then(reponse => reponse.json())
        .then(reponse => console.log(reponse));


}
