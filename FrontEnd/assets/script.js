//appelde la fonction mode édition
modeEdition();

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
    buttonFilter.addEventListener("click", clickEventFunction);
    buttonFilter.portfoliosDatas = datasCategories;           
}; 

function clickEventFunction(e){
    let elementClicked = e.target;
    if(!elementClicked.classList.contains("btn-filter")){
        return;
    }

    let objetsFilters;
    let datasCategories = e.currentTarget.portfoliosDatas;

    let btnClass1 = document.getElementsByClassName('btn-filter');
    for(let i = 0; i < btnClass1.length; i++){
        btnClass1[i].className = "btn-filter white-bgrd-btn";
    }

    elementClicked.className = "btn-filter green-bgrd-btn"; 
    let filterName = elementClicked.dataset.filter;
       if (filterName === "all"){
        objetsFilters = datasCategories.filter(function(datasCategories){
           return datasCategories;      
        });
    };
    if (filterName === "objets"){
        objetsFilters = datasCategories.filter(function(datasCategories){
           return datasCategories.category.name === "Objets";      
        });
    };
    if (filterName === "appart"){
        objetsFilters = datasCategories.filter(function(datasCategories){
           return datasCategories.category.name === "Appartements";      
        });
    };
    if (filterName === "hotels"){
        objetsFilters = datasCategories.filter(function(datasCategories){
           return datasCategories.category.name === "Hotels & restaurants";      
        });
    };
   showPortfolio(objetsFilters);

    };
    
//Afficher les galeries
function showPortfolio(datas){
    let galleryContainer = document.getElementsByClassName("gallery");
    
    galleryContainer[0].innerHTML = '';
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

function modeEdition(){
    //suppression du token en logout
    let logout = document.querySelector('.link-logout');
        logout.addEventListener("click",function(){
        window.localStorage.removeItem("token")
    });

    //récuperation du token et stocker dans localstorage
    let isLoged = localStorage.getItem("token");
    if (isLoged != null){
        showEditElement("block", 'mode-edition');
        showEditElement("none", 'mode-visitor')
    }else{
        showEditElement("none", 'mode-edition');
        showEditElement("block", 'mode-visitor')
    }}

//Afficher la page de chargement
function showEditElement(styleDisplay, paramClassName){
    let editsElements = document.getElementsByClassName(paramClassName);

    for (let i = 0; i < editsElements.length; i++) {
        editsElements[i].style.display = styleDisplay;
    }
}


        

