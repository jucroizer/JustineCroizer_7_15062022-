export {recipeFactory};

    function recipeFactory(data) {
        
    const { name, id, time, description } = data;

    // const { name, id, servings, time, description, appliance, ustensils } = data;
    
    // Création des éléments HTML de la page
    function getRecipeCardDOM() {

        // Tableau qui contient uniquement les datas des ingredients de chaques recettes
        const ingredientsTab = Array.from(data.ingredients);
        // console.log(ingredientsTab);

        // Carte Container
        const recipeCard = document.createElement('div');
        recipeCard.setAttribute('id', id);
        recipeCard.setAttribute('class', 'col-xxl-3 recipe-card');

        // Container de l'image
        const containerRecipe = document.createElement('div');
        containerRecipe.setAttribute('class', 'recipe-card-img');

        const img = document.createElement('img');
        img.setAttribute("src", "img/mariana-medvedeva-iNwCO9ycBlc-unsplash.jpg");
        img.setAttribute("class", "back-img");
        
        // Container du header de la recette
        const containerHeader = document.createElement('div');
        containerHeader.setAttribute('class', 'container container-header');

        // Container des instructions de la recette
        const containerInstructions = document.createElement('div');
        containerInstructions.setAttribute('class', 'container instructions');

        const nom = document.createElement('p');
        nom.textContent = name;
        nom.setAttribute('class', 'recipe-title');
        
        // const combien = document.createElement('p');
        // combien.textContent = servings;

        const containerIngredient = document.createElement('div');
        containerIngredient.setAttribute('class', 'col-ms-2 ingredients');
        
        let ingredient;

        for(let i = 0; i < ingredientsTab.length; i++){
            
            //il faut creer une case pour l'ingredient, la quantite et l'unité
            ingredient = document.createElement('p');
            ingredient.textContent = ingredientsTab[i].ingredient;

            // Faire un if (ingredientsTab[i] == 'null || ingredientsTab[i] == 'undefined') alors je ne met rien same pour l'unité

            if(ingredientsTab[i].quantity == null || ingredientsTab[i].quantity == 'undefined'){
                ingredient.textContent = ingredientsTab[i].ingredient;
            }else if(ingredientsTab[i].unit == null || ingredientsTab[i].unit == 'undefined'){
                ingredient.textContent = ingredientsTab[i].ingredient + ': ' + ingredientsTab[i].quantity;
            }else{
                ingredient.textContent = ingredientsTab[i].ingredient + ': ' + ingredientsTab[i].quantity + ingredientsTab[i].unit;
            }
            
            //insertion de chaque ingredients dans la div qui lui correspond
            containerIngredient.appendChild(ingredient);
        }

        const icoTime = document.createElement('img');
        icoTime.setAttribute("src", 'img/clock.svg');
        icoTime.setAttribute('class', 'timer'); 
        
        const temps = document.createElement('p');
        temps.textContent = time + ' min';
        temps.setAttribute('class', 'time');

    
        const recette = document.createElement('p');
        recette.textContent = description;
        recette.setAttribute('class', 'col-ms-2 recette');

        // const outils = document.createElement('p');
        // outils.textContent = appliance;
        // console.log(outils);

        // const materiel = document.createElement('p');
        // materiel.textContent = ustensils;
        
       recipeCard.appendChild(containerRecipe);
       containerRecipe.appendChild(img);
       recipeCard.appendChild(containerHeader);
       containerHeader.appendChild(nom);
       containerHeader.appendChild(temps);
       temps.appendChild(icoTime);
       recipeCard.appendChild(containerInstructions);
    //    containerInstructions.appendChild(combien);
       containerInstructions.appendChild(containerIngredient);
       containerInstructions.appendChild(recette);
    //    containerInstructions.appendChild(outils);
    //    containerInstructions.appendChild(materiel);
        
        return (recipeCard);
    }

    // // Création des éléments HTML du bandeau de la page du photographe
    // function getPhotographerMeta() {

    //     const header = document.getElementById('photograph-header');

    //     const divProfile = document.createElement('div');
    //     divProfile.setAttribute("class", 'photographer-profile');

    //     const divPortrait = document.createElement('div');
    //     divPortrait.setAttribute("class", "user");

    //     const img = document.createElement('img');
    //     img.setAttribute("src", picture);
    //     img.setAttribute("class", "user-img");
    //     img.setAttribute('aria-label', name);

    //     const h1 = document.createElement('h1');
    //     h1.textContent = name;
    //     h1.setAttribute("id", "photographer-name");

    //     const pLocation = document.createElement('p');
    //     pLocation.textContent = city + ', ' + country;
    //     pLocation.setAttribute('class', 'photographer-location');

    //     const pTagline = document.createElement('p');
    //     pTagline.textContent = tagline;
    //     pTagline.setAttribute('class', 'photographer-tagline');

        
    //     header.appendChild(divProfile);
    //     header.appendChild(divPortrait);
        
    //     divPortrait.appendChild(img);
    //     divProfile.appendChild(h1);
    //     divProfile.appendChild(pLocation);
    //     divProfile.appendChild(pTagline);
    //     return(header);
    // }

    // // Création des éléments HTML de la page photographe
    // function getPhotographerMedia() {

    //     const photoDiv = document.createElement('div');
    //     photoDiv.setAttribute('class', 'photographer-media');

    //     let link;

    //     let media = document.createElement('img');
    //     if(data.image != undefined){
    //         link = document.createElement('button');
    //         link.setAttribute('class', 'enterBtn');
    //         media = document.createElement('img');
    //         media.setAttribute("src", `assets/photographers/${photographerId}/${data.image}`);
    //         media.setAttribute("alt", `${data.title}`);
    //         media.setAttribute("class", 'media thumb-img');
    //     }else{
    //         link = document.createElement('button');
    //         link.setAttribute('class', 'enterBtn');
    //         media = document.createElement('video');
    //         media.setAttribute("src", `assets/photographers/${photographerId}/${data.video}`);
    //         media.setAttribute("type", "video/mp4");
    //         media.setAttribute("title", `${data.title}`);
    //         media.setAttribute("class", 'media thumb-vid');
    //     }

    //     const mediaHeader = document.createElement('div');
    //     mediaHeader.setAttribute('class', 'media-header');

    //     const pTitle = document.createElement('p');
    //     pTitle.textContent = title;
    //     pTitle.setAttribute('class', 'img-title');

    //     const pLikes = document.createElement('p');
    //     pLikes.textContent = likes;
    //     pLikes.setAttribute('class', 'numb-likes');

    //     const btnLike = document.createElement('div');
    //     btnLike.setAttribute('class', 'div-like');

    //     const heartLike = document.createElement('button');
    //     heartLike.setAttribute('class', 'btn-like');
    //     heartLike.setAttribute('aria-label', 'likes');
    //     heartLike.innerHTML = '<i class="fas fa-heart" aria-hidden="true"></i>';

        
    //     photoDiv.appendChild(link);
    //     link.appendChild(media);
    //     photoDiv.appendChild(mediaHeader);
    //     mediaHeader.appendChild(pTitle);
    //     btnLike.appendChild(pLikes);
    //     mediaHeader.appendChild(btnLike);
    //     btnLike.appendChild(heartLike);
    //     return(photoDiv);
    // }

    // renvoi les éléments créer dans la factorie
    return { getRecipeCardDOM }
}