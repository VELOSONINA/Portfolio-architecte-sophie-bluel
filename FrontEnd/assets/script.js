//appel de la fonction mode édition
modeEdition();

let portfolioUrl = 'http://localhost:5678/api/works';
loadPortfolios (portfolioUrl);

function loadPortfolios (paramPortfolioUrl){
    //récuperer de la galerie depuis backend
    fetch(paramPortfolioUrl)
        .then(response => response.json())
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
        initModal(portfolios);
    });
};

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
    };

    let objetsFilters;
    let datasCategories = e.currentTarget.portfoliosDatas;

    let btnClass1 = document.getElementsByClassName('btn-filter');
    for(let i = 0; i < btnClass1.length; i++){
        btnClass1[i].className = "btn-filter white-bgrd-btn";
    };

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
    
//fonction pour afficher les galeries
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
        figureElement.classList.add("work-to-delete-" + datas[i].id)

        //rattacher figureElement à la galleryElement
        galleryContainer[0].appendChild(figureElement);
    };
};   

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
        //mode édition
        showEditElement("block", 'mode-edition');
        showEditElement("none", 'mode-visitor')
    }else{
        //mode visiteur
        showEditElement("none", 'mode-edition');
        showEditElement("block", 'mode-visitor')
    };
};

//Afficher la page de chargement ou le mode d'édition de la page
function showEditElement(styleDisplay, paramClassName){
    let editsElements = document.getElementsByClassName(paramClassName);

    for (let i = 0; i < editsElements.length; i++){
        editsElements[i].style.display = styleDisplay;
    };
};

// déclaration variable modal
let modal = document.getElementById("myModal");

let iconArrows = document.createElement('i');

//fonction pour afficher les elements dans le modal
function initModal(datasModal){  
   
    let galleryModal = document.getElementsByClassName("modal-gallery");
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

        //selectionner une image
        iconTrash.dataset.workId = datasModal[i].id;

        //fonction pour supprimer une image
        iconTrash.addEventListener("click",onDelete); 

        function onDelete(event){
            event.preventDefault()
            let id = event.target.dataset.workId; 
            let worksToDelete = document.getElementsByClassName("work-to-delete-" + id);
 
            let counter = worksToDelete.length;
            for (let i=0; i <= worksToDelete.length; i++){
                 
                worksToDelete[counter-1].remove();
                counter--;
                if(i == worksToDelete.length - 1){
                    deleteFigure(id);
                };
            };
            showMessageOnClick("message-delete");
        };
    
        //rattacher les images à modalContent
        figureModal.appendChild(imagesModal);
        figureModal.appendChild(figCapModal);
        figureModal.appendChild(iconTrash);
        //afficher l'icone flèche que dans la première image
        if (i===0){ 
            figureModal.appendChild(iconArrows)
        };

        figureModal.classList.add("work-to-delete-" + datasModal[i].id)
        modalContent.appendChild(figureModal);

        //rattacher les éléments à modal
        galleryModal[0].appendChild(figureModal);
    };
}; 

//fonction pour recupérer id de l'élément à supprimer dans le backend
async function deleteFigure(id){ 
    try {
        let authToken = localStorage.getItem("token");
        let response = await fetch(`http://localhost:5678/api/works/${id}`,{
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
    }catch (error) {
        console.error(error);
    };
};

//déclaration du variable pour l'ouverture du modal
let openModal = document.getElementById("myBtn-modal");

// fontion pour ouvrir le modal
openModal.onclick = function(){
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
};

//déclaration variable pour la fermeture du modal
let closeModal = document.getElementsByClassName("close")[0];
//fonction <span> (x), fermeture du modal
closeModal.onclick = function(){
    modal.style.display = "none";
    document.body.style.overflow = "initial";
};

//fonction qui permet de fermer le modal 
//quand on click à l'extérieur du modal
 window.onclick = function(event){
     if (event.target == modal) {
     modal.style.display = "none";
     };
};

//fonction clavier 
document.addEventListener("keydown", function(e){
    let modalClass = modal.classList;
    if (e.key === "Escape" && !modalClass.contains("close")){
        modal.style.display = "none";
    }
  });

//Afficher la page pour ajouter une image 
//quand on click sur le boutton ajouter une image dans modal
let buttonDispModal = document.querySelector('.btn-change-content');

buttonDispModal.addEventListener("click",function(e){ 
    e.preventDefault();
    
    let modalContent = document.getElementById(".modal-content");
    if (modalContent != null){
        showReloadModal("block", 'modal-one');
        showReloadModal("none", 'mode-two');
    }else{
        showReloadModal("none", 'modal-one');
        showReloadModal("block", 'modal-two'); 
        resetFormFunction();
    }; 
});

function showReloadModal(styleDisplay, paramClassName){
    let reLoadElements = document.getElementsByClassName(paramClassName);
    for (let i = 0; i < reLoadElements.length; i++) {
        reLoadElements[i].style.display = styleDisplay;
    };
}; 

//revenir sur le premier affichage du modal
let buttonArrowLeft = document.querySelector('.fa-arrow-left');
buttonArrowLeft.addEventListener("click",function(e){ 
    e.preventDefault();
    showReloadModal("none", 'modal-two');
    showReloadModal("grid", 'modal-one');
});

//récuperer les catégories depuis backend
let categoriesUrl = 'http://localhost:5678/api/categories';
fetch(categoriesUrl)
    .then(response => response.json())
    .then(data => {
        showCategories(data)
});

//fonction pour afficher les catégories
function showCategories(datasCategories){
    let select = document.getElementById('categorie');
    
    for (let i = 0; i < datasCategories.length; i++) {
        let element = datasCategories[i];
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = element.name;
        select.appendChild(option);
    };
};

//déclaration variable du formulaire du second modal
let formSubmit = document.getElementById('form-works');

//fonction pour envoyer les données du formulaire
formSubmit.addEventListener("submit", sendPortfolio);

async function sendPortfolio(event) {
    event.preventDefault()
    
    let category = document.getElementById("categorie").value;
    let title = document.getElementById("title").value;
    let formData = new FormData();
    let imageFile = fileInput.files[0];

    if (!checkField(imageFile,title)) {
        return;
    };

    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    changeBkgrdColorOfButton(imageFile, title);
    
    let authToken = localStorage.getItem("token");
    try { 
        let response = await fetch(`http://localhost:5678/api/works`,{
            method: 'POST',
            headers :  {
                'Authorization': `Bearer ${authToken}`,
            },  
            body: formData,
        })
        .then(data => {   
            //Affiche l'image qui à était uploadé 
            // dans le modal et dans la page(les liste d'image)
            loadPortfolios (portfolioUrl);  

            //Vider le formulaire après validation des données
            showMessageOnClick("message-send"); 
            resetFormFunction();          
        });
    }catch (error) {
        console.error(error);
    }; 
}; 

//déclaration variables input image
let fileInput = document.getElementById("fileInput");
let preview = document.getElementById("preview");

//fonction du bouton pour charger l'image
fileInput.addEventListener("change", updateImageDisplay);

function updateImageDisplay(e) {
    e.preventDefault();

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function() {
        preview.src = reader.result;
    });
    if (file) {
        reader.readAsDataURL(file);
        displayUploadButton("none");
    };
};

//fonction pour verifier les champs du formulaire 
function checkField(imageFile, title){
    let errorElement = document.getElementsByClassName("msg-error");
    if (!title || !imageFile){
        //afficher le message d'erreur
        if (!imageFile){
            errorElement[0].style.display = "block";
        };
        if (!title){
            errorElement[1].style.display = "block";
        };
        if (!title && !imageFile){
            errorElement[2].style.display = "block";
        };

        //cacher le message d'erreur
        setTimeout(function(){
            hideErrorFields();
        }, 4000);
        return false
    }; 
    return true;
};

//fonction pour vider les champs dans le formulaire
function resetFormFunction(){
    setTimeout(() => {
        sendButton.style.background = "#b3b3b3";
    }, 3000);  
    preview.src = "";
    formSubmit.reset();
    displayUploadButton("initial");
};

//déclaration variable qui contient la classe img-preview
let imagePreview = document.getElementsByClassName("img-preview");

//fonction pour cacher le formulaire avant validation 
//et initialiser le formulaire après validation
function displayUploadButton(displayStringPreview){        
    for (let i = 0; i < imagePreview.length; i++) {
        imagePreview[i].style.display = displayStringPreview;
    };
};

//fonction pour cacher le message d'erreur dans le formulaire
function hideErrorFields(){
    let errorElement = document.getElementsByClassName("msg-error");

    for (let i = 0; i < errorElement.length; i++) {
        errorElement[i].style.display = "none";
    };
};

//fonction pour changer la couleur du bouton si les conditions sont remplis
function changeBkgrdColorOfButton(imageFile, title) {
    //déclaration variable du boutton submit
    let sendButton = document.getElementById("sendButton");

    if(imageFile && title){
        sendButton.style.background = "#1D6154";
    }else{
        sendButton.style.background = "#b3b3b3";
    };
};

//fonction afficher messages confirmation quand supprimer et valider
function showMessageOnClick(messageDisplay){

    let messageModalSelect = document.getElementById(messageDisplay);
    messageModalSelect.style.display = "block";
    setTimeout(() => {
        messageModalSelect.style.display = "none";
    }, 4000);
}

