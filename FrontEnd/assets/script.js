let portfolioUrl = 'http://localhost:5678/api/works';
// let portfolios;

//récuperer des galerie depuis backend
fetch(portfolioUrl) 
    .then(reponse => reponse.json())
    .then(portfolios => {

    showPortfolio(portfolios);
    filterPortfolio(portfolios);
    });

function showPortfolio(datas){
    for (i=0 ; i< datas.length; i++){

        //création des éléments dans la galerie
        let galleryContainer = document.getElementsByClassName("gallery");
        let figureElement = document.createElement('figure');
        let imagesElement = document.createElement('img');
        let figCapElement = document.createElement('figcaption');

        //Afficher les images et les titres 
        imagesElement.src = datas[i].imageUrl;
        figCapElement.innerHTML = datas[i].title;

        //rattacher les images à figureElement
        figureElement.appendChild(imagesElement);
        figureElement.appendChild(figCapElement);

        //rattacher figureElement à la galleryElement
        galleryContainer[0].appendChild(figureElement);
    };
}


    //gestion des filtres
        function filterPortfolio(datasCategories){ 
        let buttonFilter = document.querySelector('.btn-filter');

        buttonFilter.addEventListener('click',e => {
            let filterClass = e.target.className;
            if(filterClass === "filter-objets"){
                let objetsFilters = datasCategories.filter(function(category){
                    return category.name === "Objets";  
                })
                console.log(objetsFilters);
            };
        }) 
       
    };
    

   
       




      
       
        
    
    

   