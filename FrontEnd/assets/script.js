let portfolioUrl = 'http://localhost:5678/api/works';

//récuperer des galerie depuis backend
fetch(portfolioUrl)
    .then(reponse => reponse.json())
    .then(portfolios => {
 
    //affiche les boutons en blanc
    let btnClass = document.getElementsByClassName('btn-filter');
    for(let i =0; i < btnClass.length; i++){
        btnClass[i].className = "btn-filter white-bgrd-btn";
    }
    //affiche le premier bouton en vert
    btnClass[0].className = "btn-filter green-bgrd-btn";

    showPortfolio(portfolios);
    filterPortfolio(portfolios);
    });

    //gestion des filtres
    function filterPortfolio(datasCategories){ 
        let buttonFilter = document.querySelector('.btn-filters');
        let objetsFilters;

        buttonFilter.addEventListener('click',e => {        
            let btnClass1 = document.getElementsByClassName('btn-filter');
            
            for(let i = 0; i < btnClass1.length; i++){
                 btnClass1[i].className = "btn-filter white-bgrd-btn";
            }

            let elementClicked = e.target; 
            elementClicked.className = "btn-filter + green-bgrd-btn"; 
            let filterName = elementClicked.dataset.filter;

                if (filterName === "filter-all"){
                    objetsFilters = datasCategories.filter(function(datasCategories){
                    return datasCategories;      
                    });
                };
                if (filterName === "filter-objets"){
                    objetsFilters = datasCategories.filter(function(datasCategories){
                    return datasCategories.category.name === "Objets";      
                    });
                };
                if (filterName === "filter-appart"){
                    objetsFilters = datasCategories.filter(function(datasCategories){
                    return datasCategories.category.name === "Appartements";      
                    });
                };
                if (filterName === "filter-hotels"){
                    objetsFilters = datasCategories.filter(function(datasCategories){
                    return datasCategories.category.name === "Hotels & restaurants";      
                    });
                };
            showPortfolio(objetsFilters);
        });              
    };    
        
    //Afficher les galeries
    function showPortfolio(datas){
        let galleryContainer = document.getElementsByClassName("gallery");
        while(galleryContainer[0].children.length > 0){
            galleryContainer[0].children[0].remove()
        }
        
        for (i=0 ; i< datas.length; i++){

            //création des éléments dans la galerie
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
        
  