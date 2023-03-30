window.onload = function () {

    const portfolioUrl = 'http://localhost:5678/api/works';
    
    fetch(portfolioUrl)
        .then(reponse => reponse.json())
        .then(reponse => console.log(reponse));


}
