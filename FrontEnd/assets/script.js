let portfolioUrl = 'http://localhost:5678/api/works';
let portfolios;



fetch(portfolioUrl) 
    .then(reponse => reponse.json())
    .then(portfolios => {

    showPortfolio(portfolios)
    });

function showPortfolio(datas){
    for (i=0 ; i< datas.length; i++){

        //création des éléments figure,img et figcaption
        let galleryContainer = document.getElementsByClassName("gallery");
        let figureElement = document.createElement('figure');
        let imagesElement = document.createElement('img');
        let figCapElement = document.createElement('figcaption');

        //Afficher les images et les titres 
        imagesElement.src = datas[i].imageUrl;
        figCapElement.innerHTML = datas[i].title;

    
        figureElement.appendChild(imagesElement);
        figureElement.appendChild(figCapElement);
        galleryContainer[0].appendChild(figureElement);
    };

}
      
       
        
    
    

   