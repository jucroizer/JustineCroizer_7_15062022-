import {recipeFactory} from '../factorie/recipeFactory.js';

    const fetchData = async () => {
        try {
        const res = await fetch("data/recipes.json");
        console.log(res);
        let data = await res.json();
        console.log(data);
        displayData(data);
        } catch (e) {
        console.log("something went wrong!", e);
        }
  };

  let tabIngredients = [];
  let tabAppareil = [];
  let tabUstensiles = [];
  let tabRecipes = [];

    async function displayData(recipes) {

        let recettes = Array.from(recipes.recipes);
        // console.log(recettes);
        // récupére l'élément ayant la classerecipes-section
        const recipesSection = document.querySelector("#recipes");
        // console.log(recipesSection);

        // Pour chaque photographe...
        recettes.forEach((recipe) => {
    
            // Communique avec la factorie et passe en argument les éléments json dont la factorie a besoin
            const recipeModel = recipeFactory(recipe);
            // console.log(recipeModel);

            tabIngredients.push(recipe.ingredients);
            tabAppareil.push(recipe.appliance);
            tabUstensiles.push(recipe.ustensils);
            tabRecipes.push(recipe);

            // récupére les éléments de chaque recette et crée les éléments
            const recipeCardDOM = recipeModel.getRecipeCardDOM();
            
            // insére les éléments dans le DOM
            recipesSection.appendChild(recipeCardDOM);
        });
    }

    async function init() {
        // lance la fonction fetchData
        await fetchData();
    }
    
    init(); 
    
    console.log(tabIngredients);
    console.log(tabAppareil);
    console.log(tabUstensiles);

    // Créer le champs de recherche principal
    function searchBar(){

        // Création du champs de recherche
        const containerInput = document.createElement('div');
        containerInput.setAttribute('id', 'search-bar');
        const labelInput = document.createElement('label');
        labelInput.setAttribute('for', 'search');
        const iconeSearch = document.createElement('img');
        iconeSearch.setAttribute('src', 'img/search.svg');
        const inputSearch = document.createElement('input');
        inputSearch.setAttribute('type', 'text');
        inputSearch.setAttribute('id', 'search');
        inputSearch.setAttribute('placeholder', 'Rechercher une recette');

        containerInput.appendChild(inputSearch);
        containerInput.appendChild(labelInput);
        labelInput.appendChild(iconeSearch);

        //Implémentation du champs de recherche dans le body
        document.getElementById('body').appendChild(containerInput);
    }

    searchBar();

    let recipesSec = document.getElementById('recipes-section');
    console.log(recipesSec);
    const searchB = document.getElementById('search-bar');
    console.log(searchB);
    let parentDiv = recipesSec.parentNode;
    console.log(parentDiv);

    parentDiv.insertBefore(searchB, recipesSec);

    const submissionBtn = document.getElementById('search');
    console.log(submissionBtn);
    submissionBtn.addEventListener('input', submissionSearch);

    // Fonction de recherche après soumission 
    function submissionSearch(e){
        let valueInput = document.getElementById('search').value;
        console.log(valueInput);
        
        // recipesSec.innerHTML = "";

        const searchRecipes = e.target.value.toLowerCase();

        const filterRecipesTab = tabRecipes.filter( el => el.name.toLowerCase().includes(searchRecipes));

        refreshRecipes(filterRecipesTab);
    }

    function refreshRecipes(e) {

        console.log(e);
        let data = 0;

        const removeRecipe = document.getElementById('recipes');
        // vide la page
        removeRecipe.innerHTML = '';
    
        for(data in e){
            console.log(data);
            const ingredientsTab = Array.from(e[data].ingredients);
            
            const recipeCard = document.createElement('div');
            recipeCard.setAttribute('id', e[data].id);
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
            nom.textContent = e[data].name;
            nom.setAttribute('class', 'recipe-title');
            console.log(nom);
            
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
            temps.textContent = e[data].time + ' min';
            temps.setAttribute('class', 'time');

        
            const recette = document.createElement('p');
            recette.textContent = e[data].description;
            recette.setAttribute('class', 'col-ms-2 recette');
            
            recipeCard.appendChild(containerRecipe);
            containerRecipe.appendChild(img);
            recipeCard.appendChild(containerHeader);
            containerHeader.appendChild(nom);
            containerHeader.appendChild(temps);
            temps.appendChild(icoTime);
            recipeCard.appendChild(containerInstructions);
            containerInstructions.appendChild(containerIngredient);
            containerInstructions.appendChild(recette);
            removeRecipe.appendChild(recipeCard);
    }

}

    // Créer un selecteur de filtre

    // Trier le tableau souhaité et regroupé 