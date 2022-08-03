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
        
        return (recipeCard);
    }

    // renvoi les éléments créer dans la factorie
    return { getRecipeCardDOM }
}