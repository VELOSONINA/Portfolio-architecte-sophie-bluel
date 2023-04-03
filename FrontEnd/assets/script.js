           
    const portfolioUrl = 'http://localhost:5678/api/works';
    let portfolios;

    
    fetch(portfolioUrl) 
        .then(reponse => reponse.json())
        .then(portfolios => {

        showPortfolio(portfolios)
        }
        );

        function showPortfolio(datas){
            let galleryContainer = document.querySelectorAll(".gallery");
            let figureElement = document.createElement('figure');
            let imagesElement = document.createElement('img');
    
            imagesElement.src = datas[0].imageUrl;
        
            figureElement.appendChild(imagesElement);


        }
    
        
