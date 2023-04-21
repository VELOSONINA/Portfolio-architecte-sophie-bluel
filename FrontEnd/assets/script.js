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
    showModal(portfolios);
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

//fonction pour afficher le mode d'édition de la page
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

//Afficher la page de chargement ou le mode d'édition de la page
function showEditElement(styleDisplay, paramClassName){
    let editsElements = document.getElementsByClassName(paramClassName);

    for (let i = 0; i < editsElements.length; i++) {
        editsElements[i].style.display = styleDisplay;
    }
}

// déclaration variable modal
let modal = document.getElementById("myModal");

//déclaration du variable pour l'ouverture du modal
let modifButton = document.getElementById("myBtn-modal");

// déclaration variable pour la fermeture du modal
let closeModal = document.getElementsByClassName("close")[0];

let galleryModal = document.getElementsByClassName("modal-gallery");
let iconArrows = document.createElement('i');

//fonction pour afficher les elements dans le modal
function showModal(datasModal){  
    // let galleryModal = document.getElementsByClassName("modal-gallery");
    // let iconArrows = document.createElement('i');

    //ajouter l'icone flèches dans le premier élémént
    iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right");
    
    galleryModal[0].innerHTML = '';
    
    for (i=0 ; i< datasModal.length; i++){

        //création des éléments dans le modal
        let modalContent = document.createElement('modal-content');
        let figureModal = document.createElement('figure');
        let imagesModal = document.createElement('img');
        let figCapModal = document.createElement('figcaption');
        let iconTrash = document.createElement('i');
           
        //Afficher les images et les titres 
        imagesModal.src = datasModal[i].imageUrl;
        figCapModal.innerHTML = "éditer";

        //ajouter l'icone corbeil
        iconTrash.classList.add("fa-solid", "fa-trash-can");
        
        //rattacher les images à modalContent
        figureModal.appendChild(imagesModal);
        figureModal.appendChild(figCapModal);
        figureModal.appendChild(iconTrash);
        //afficher l'icone flèche que dans la première image
        if (i===0){ 
        figureModal.appendChild(iconArrows)
        };
        modalContent.appendChild(figureModal);

        //rattacher les éléments à modal
        galleryModal[0].appendChild(figureModal);
    };
}   

// fontion pour ouvrir le modal
modifButton.onclick = function() {
    modal.style.display = "block";
}

// fonction <span> (x), fermeture du modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// fonction qui permet de fermer le modal quand on click à l'extérieur du modal
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

let buttonTrash = document.querySelector('.iconTrash');

if (buttonTrash != null){
    buttonTrash.addEventListener("click",eventClickFunction);  
    function eventClickFunction(event){
        console.log(event,this);
    }  
}


//Ajouter une image quand on click sur le boutton ajouter une image dans modal
let buttonAddImage = document.querySelector('.btn-add-img');
buttonAddImage.addEventListener("click",function(e){ 
    e.preventDefault();
    console.log(buttonAddImage);
   
})

