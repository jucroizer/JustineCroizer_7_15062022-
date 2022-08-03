import { recipeFactory } from "../factorie/recipeFactory.js";

const fetchData = async () => {
  try {
    const res = await fetch("data/recipes.json");
    let data = await res.json();
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

// console.log(tabIngredients);
// console.log(tabAppareil);
// console.log(tabUstensiles);

/**
 * CHamps de recherche principal
 */
function searchBar() {
  // Création du champs de recherche
  const containerInput = document.createElement("div");
  containerInput.setAttribute("id", "search-bar");
  const labelInput = document.createElement("label");
  labelInput.setAttribute("for", "search");
  const iconeSearch = document.createElement("img");
  iconeSearch.setAttribute("src", "img/search.svg");
  const inputSearch = document.createElement("input");
  inputSearch.setAttribute("type", "text");
  inputSearch.setAttribute("id", "search");
  inputSearch.setAttribute("placeholder", "Rechercher une recette");

  containerInput.appendChild(inputSearch);
  containerInput.appendChild(labelInput);
  labelInput.appendChild(iconeSearch);

  //Implémentation du champs de recherche dans le body
  document.getElementById("body").appendChild(containerInput);
}

searchBar();

let recipesSec = document.getElementById("filter-tab");
const searchB = document.getElementById("search-bar");
let parentDiv = recipesSec.parentNode;

parentDiv.insertBefore(searchB, recipesSec);

const submissionBtn = document.getElementById("search");
console.log(submissionBtn);
submissionBtn.addEventListener("input", submissionSearch);

// Fonction de recherche après soumission
function submissionSearch(e) {
  const searchRecipes = e.target.value.toLowerCase();

  let filterRecipesTab = [];

  // let filterRecipesTab = tabRecipes.filter(el =>
  //     el.name.toLowerCase().includes(searchRecipes) || el.appliance.toLowerCase().includes(searchRecipes)
  // ); // Sert pour la deuxième implémentation

  for (let recipe in tabRecipes) {
    if (!filterRecipesTab.includes(tabRecipes[recipe])) {
      if (tabRecipes[recipe].name.toLowerCase().includes(searchRecipes)) {
        filterRecipesTab.push(tabRecipes[recipe]);
        console.log(tabRecipes[recipe]);
      }
      if (tabRecipes[recipe].appliance.toLowerCase().includes(searchRecipes)) {
        filterRecipesTab.push(tabRecipes[recipe]);
        console.log(tabRecipes[recipe]);
      }
    }
  }

  for (let recipe in tabRecipes) {
    if (!filterRecipesTab.includes(tabRecipes[recipe])) {
      for (let ingredient in tabRecipes[recipe].ingredients) {
        if (
          tabRecipes[recipe].ingredients[ingredient].ingredient
            .toLowerCase()
            .includes(searchRecipes)
        ) {
          filterRecipesTab.push(tabRecipes[recipe]);
          console.log(tabRecipes[recipe]);
        }
      }
    }
  }

  for (let recipe in tabRecipes) {
    if (
      !filterRecipesTab.includes(
        tabRecipes[recipe] || tabRecipes[recipe].ingredients
      )
    ) {
      for (let ustensil in tabRecipes[recipe].ustensils) {
        if (
          tabRecipes[recipe].ustensils[ustensil]
            .toLowerCase()
            .includes(searchRecipes)
        ) {
          filterRecipesTab.push(tabRecipes[recipe]);
          console.log(tabRecipes[recipe]);
        }
      }
    }
  }

  refreshRecipes(filterRecipesTab);
  // refreshRecipes(filterRecipesIngredients);
}

// fonction qui vide la page et remplace avec les mots clés
function refreshRecipes(e) {
  // console.log(e);
  let data = 0;

  const removeRecipe = document.getElementById("recipes");
  // vide la page
  removeRecipe.innerHTML = "";

  for (data in e) {
    console.log(data);
    const ingredientsTab = Array.from(e[data].ingredients);
    console.log(ingredientsTab);

    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("id", e[data].id);
    recipeCard.setAttribute("class", "col-xxl-3 recipe-card");

    // Container de l'image
    const containerRecipe = document.createElement("div");
    containerRecipe.setAttribute("class", "recipe-card-img");

    const img = document.createElement("img");
    img.setAttribute("src", "img/mariana-medvedeva-iNwCO9ycBlc-unsplash.jpg");
    img.setAttribute("class", "back-img");

    // Container du header de la recette
    const containerHeader = document.createElement("div");
    containerHeader.setAttribute("class", "container container-header");

    // Container des instructions de la recette
    const containerInstructions = document.createElement("div");
    containerInstructions.setAttribute("class", "container instructions");

    const nom = document.createElement("p");
    nom.textContent = e[data].name;
    nom.setAttribute("class", "recipe-title");
    console.log(nom);

    // const combien = document.createElement('p');
    // combien.textContent = servings;

    const containerIngredient = document.createElement("div");
    containerIngredient.setAttribute("class", "col-ms-2 ingredients");

    let ingredient;

    for (let i = 0; i < ingredientsTab.length; i++) {
      //il faut creer une case pour l'ingredient, la quantite et l'unité
      ingredient = document.createElement("p");
      ingredient.textContent = ingredientsTab[i].ingredient;

      // Faire un if (ingredientsTab[i] == 'null || ingredientsTab[i] == 'undefined') alors je ne met rien same pour l'unité

      if (
        ingredientsTab[i].quantity == null ||
        ingredientsTab[i].quantity == "undefined"
      ) {
        ingredient.textContent = ingredientsTab[i].ingredient;
      } else if (
        ingredientsTab[i].unit == null ||
        ingredientsTab[i].unit == "undefined"
      ) {
        ingredient.textContent =
          ingredientsTab[i].ingredient + ": " + ingredientsTab[i].quantity;
      } else {
        ingredient.textContent =
          ingredientsTab[i].ingredient +
          ": " +
          ingredientsTab[i].quantity +
          ingredientsTab[i].unit;
      }

      //insertion de chaque ingredients dans la div qui lui correspond
      containerIngredient.appendChild(ingredient);
    }

    const icoTime = document.createElement("img");
    icoTime.setAttribute("src", "img/clock.svg");
    icoTime.setAttribute("class", "timer");

    const temps = document.createElement("p");
    temps.textContent = e[data].time + " min";
    temps.setAttribute("class", "time");

    const recette = document.createElement("p");
    recette.textContent = e[data].description;
    recette.setAttribute("class", "col-ms-2 recette");

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

// console.log(tabIngredients);
// console.log(tabAppareil);

// function createButton() {
//   // let tabIngredientListe = [];
//   // let tabAppareilListe = [];
//   //   let tabUstensileListe = [];
//   // for(let i = 0; i < tabIngredients.length; i++){
//   //     console.log('et la2');
//   //     for(let j = 0; j < tabIngredients[i].length; j++){
//   //         let minim = tabIngredients[i][j].ingredient.toLowerCase();
//   //         if(!tabIngredientListe.includes(minim)){
//   //             let ingredientBtn = document.createElement('button');
//   //             ingredientBtn.textContent = minim;
//   //             document.getElementById('body').appendChild(ingredientBtn);
//   //             tabIngredientListe.push(minim);
//   //         }
//   //     }
//   // }
//   //   for (let i = 0; i < tabUstensiles.length; i++) {
//   //     console.log("et la2");
//   //     for (let j = 0; j < tabUstensiles[i].length; j++) {
//   //       let minim = tabUstensiles[i][j].toLowerCase();
//   //       if (!tabUstensileListe.includes(minim)) {
//   //         let ustensilBtn = document.createElement("button");
//   //         ustensilBtn.textContent = minim;
//   //         document.getElementById("body").appendChild(ustensilBtn);
//   //         tabUstensileListe.push(minim);
//   //       }
//   //     }
//   //   }
//   // for(let i = 0; i < tabAppareil.length; i++){
//   //     console.log('et la2');
//   //     for(let j = 0; j < tabAppareil[i].length; j++){
//   //         let minim = tabAppareil[i].toLowerCase();
//   //         if(!tabAppareilListe.includes(minim)){
//   //             let appareilBtn = document.createElement('button');
//   //             appareilBtn.textContent = minim;
//   //             document.getElementById('body').appendChild(appareilBtn);
//   //             tabAppareilListe.push(minim);
//   //         }
//   //     }
//   // }
// }

// setTimeout(createButton, 1000);

// Créer un selecteur de filtre

// compteur pour assigner les id
let idCount = 0;
let tabIngredientListe = [];

function createIngredFilter() {
  const dropdownContainer = document.createElement("div");
  dropdownContainer.setAttribute("id", "dropdown-ingredients");

  const inputFilter = document.createElement("input");
  inputFilter.setAttribute("type", "text");
  inputFilter.setAttribute("id", "filter");
  inputFilter.setAttribute(
    "class",
    "btn btn-secondary input-filter input-ingredient"
  );
  inputFilter.setAttribute("placeholder", "Ingrédients");

  const btnDrop = document.createElement("button");
  btnDrop.setAttribute("type", "button");
  btnDrop.setAttribute(
    "class",
    "btn btn-secondary dropdown-toggle dropdown-toggle-split dropdown-filter"
  );
  btnDrop.setAttribute("id", "dropdownMenuReference");
  btnDrop.setAttribute("data-bs-toggle", "dropdown");
  btnDrop.setAttribute("aria-expanded", "false");
  btnDrop.setAttribute("data-bs-reference", "parent");

  const spanDrop = document.createElement("span");
  spanDrop.setAttribute("class", "visually-hidden");
  spanDrop.textContent = "Toggle Dropdown";

  const ulFilter = document.createElement("ul");
  ulFilter.setAttribute("id", "ulfilter");
  ulFilter.setAttribute("class", "dropdown-menu");
  ulFilter.setAttribute("aria-labelledby", "dropdownMenuReference");

  let liFilter;

  // au clik récupère le .target et donne un id a l'élément
  // permet la création du tag

  for (let i = 0; i < tabIngredients.length; i++) {
    for (let j = 0; j < tabIngredients[i].length; j++) {
      let minim = tabIngredients[i][j].ingredient.toLowerCase();

      if (!tabIngredientListe.includes(minim)) {
        liFilter = document.createElement("li");
        liFilter.setAttribute("id", idCount++);
        liFilter.setAttribute("class", "lifilter");
        liFilter.textContent = minim;
        ulFilter.appendChild(liFilter);
        tabIngredientListe.push(minim);
      }
    }
  }

  dropdownContainer.appendChild(inputFilter);
  dropdownContainer.appendChild(btnDrop);
  btnDrop.appendChild(spanDrop);
  dropdownContainer.appendChild(ulFilter);

  document.getElementById("filter-tab").appendChild(dropdownContainer);

  // Récuperation de l'input de l'utilisateur
  inputFilter.addEventListener("input", subFilter);
}

setTimeout(createIngredFilter, 1000);

let tabAppareilListe = [];
function createAppFilter() {
  const dropdownContainer = document.createElement("div");
  dropdownContainer.setAttribute("id", "dropdown-appareil");

  const inputFilter = document.createElement("input");
  inputFilter.setAttribute("type", "text");
  inputFilter.setAttribute("id", "filter");
  inputFilter.setAttribute(
    "class",
    "btn btn-secondary input-filter input-appareil"
  );
  inputFilter.setAttribute("placeholder", "Appareils");

  const btnDrop = document.createElement("button");
  btnDrop.setAttribute("type", "button");
  btnDrop.setAttribute(
    "class",
    "btn btn-secondary dropdown-toggle dropdown-toggle-split dropdown-filter btn-appareil"
  );
  btnDrop.setAttribute("id", "dropdownMenuReference");
  btnDrop.setAttribute("data-bs-toggle", "dropdown");
  btnDrop.setAttribute("aria-expanded", "false");
  btnDrop.setAttribute("data-bs-reference", "parent");

  const spanDrop = document.createElement("span");
  spanDrop.setAttribute("class", "visually-hidden");
  spanDrop.textContent = "Toggle Dropdown";

  const ulFilter = document.createElement("ul");
  ulFilter.setAttribute("class", "dropdown-menu ul-appareil");
  ulFilter.setAttribute("aria-labelledby", "dropdownMenuReference");

  let liFilter;

  for (let i = 0; i < tabAppareil.length; i++) {
    console.log("et la2");
    for (let j = 0; j < tabAppareil[i].length; j++) {
      let minim = tabAppareil[i].toLowerCase();
      if (!tabAppareilListe.includes(minim)) {
        liFilter = document.createElement("li");
        liFilter.setAttribute("id", idCount++);
        liFilter.setAttribute("class", "lifilter");
        liFilter.textContent = minim;
        ulFilter.appendChild(liFilter);
        tabAppareilListe.push(minim);
      }
    }
  }

  dropdownContainer.appendChild(inputFilter);
  dropdownContainer.appendChild(btnDrop);
  btnDrop.appendChild(spanDrop);
  dropdownContainer.appendChild(ulFilter);

  document.getElementById("filter-tab").appendChild(dropdownContainer);
}

setTimeout(createAppFilter, 1000);

let tabUstensileListe = [];
function createUstFilter() {
  const dropdownContainer = document.createElement("div");
  dropdownContainer.setAttribute("id", "dropdown-ustensils");

  const inputFilter = document.createElement("input");
  inputFilter.setAttribute("type", "text");
  inputFilter.setAttribute("id", "filter");
  inputFilter.setAttribute(
    "class",
    "btn btn-secondary input-filter input-ustensils"
  );
  inputFilter.setAttribute("placeholder", "Ustensils");

  const btnDrop = document.createElement("button");
  btnDrop.setAttribute("type", "button");
  btnDrop.setAttribute(
    "class",
    "btn btn-secondary dropdown-toggle dropdown-toggle-split dropdown-filter btn-ustensils"
  );
  btnDrop.setAttribute("id", "dropdownMenuReference");
  btnDrop.setAttribute("data-bs-toggle", "dropdown");
  btnDrop.setAttribute("aria-expanded", "false");
  btnDrop.setAttribute("data-bs-reference", "parent");

  const spanDrop = document.createElement("span");
  spanDrop.setAttribute("class", "visually-hidden");
  spanDrop.textContent = "Toggle Dropdown";

  const ulFilter = document.createElement("ul");
  ulFilter.setAttribute("class", "dropdown-menu ul-ustensils");
  ulFilter.setAttribute("aria-labelledby", "dropdownMenuReference");

  let liFilter;

  for (let i = 0; i < tabUstensiles.length; i++) {
    for (let j = 0; j < tabUstensiles[i].length; j++) {
      let minim = tabUstensiles[i][j].toLowerCase();
      if (!tabUstensileListe.includes(minim)) {
        liFilter = document.createElement("li");
        liFilter.setAttribute("id", idCount++);
        liFilter.setAttribute("class", "lifilter");
        liFilter.textContent = minim;
        ulFilter.appendChild(liFilter);
        tabUstensileListe.push(minim);
      }
    }
  }

  dropdownContainer.appendChild(inputFilter);
  dropdownContainer.appendChild(btnDrop);
  btnDrop.appendChild(spanDrop);
  dropdownContainer.appendChild(ulFilter);

  document.getElementById("filter-tab").appendChild(dropdownContainer);
}

setTimeout(createUstFilter, 1000);

/**
 *  Objectif : Filtrer dans le filtre la recherche de l'utilisateur (ne propose que le contenu qui contient l'input utilisateur)
 */

// Fonction de recherche après soumission
function subFilter(e) {
  console.log(tabIngredientListe);
  const searchRecipes = e.target.value.toLowerCase();

  let filterTagTab = [];

  if (document.getElementsByClassName("input-ingredient")) {
    for (let ingredient in tabIngredientListe) {
      if (!filterTagTab.includes(tabIngredientListe[ingredient])) {
        if (
          tabIngredientListe[ingredient].toLowerCase().includes(searchRecipes)
        ) {
          filterTagTab.push(tabIngredientListe[ingredient]);
          console.log(tabIngredientListe[ingredient]);
        }
      }
    }
  }

  refreshListe(filterTagTab);

}

// Création d'un tableau pour garder en mémoire la selection

// Boucle for pour vérifier comparer l'entrée utilisateur et chercher une concordance puis push de la trouvaille dans le tableau du dessus

// réaffichage de l'ingrédient sélectionné

// Meme chose pour les ustensils et les appareils

function refreshListe(e) {
  console.log(e);

  const removeRecipe = document.getElementById("ulfilter");
//   // vide la page
  removeRecipe.innerHTML = "";


    const filterTab = Array.from(e);
    console.log(filterTab);

    let liFilter;

    // au clik récupère le .target et donne un id a l'élément
    // permet la création du tag

    for (let i = 0; i < filterTab.length; i++) {
      console.log(filterTab.length);

      
        liFilter = document.createElement("li");
        liFilter.setAttribute("id", idCount++);
        liFilter.setAttribute("class", "lifilter");
        liFilter.textContent = filterTab[i];
        removeRecipe.appendChild(liFilter);
      
      
    }
  
    document.getElementById("dropdown-ingredients").appendChild(removeRecipe);
}

/**
 * Objectif : faire en sorte de faire fonctionner en concordance les 3 filtres ensemble
 */

// Création d'un tableau (tabFullFilter)

// Récupérer les tableaux de chaques filtres avec leur entrées

// Push dans le tableau général les 3 tableaux et vérifier qu'il n'y a pas de doublon avant le push

/**
 * Objectif : Faire fonctionner ensemble le filtre principal et les 3 filtres
 */

// Création d'un tableau général

// Récupérer le tableau de la recherche principale avec les données utilisateurs

// Récupérer le tableau générale des filtres à jour

// Comparer les deux tableaux et supprimer les doublons

// Push les éléments dans le tableau général

// Afficher la sélection (refreshRecipe)

/**
 * Objectifs : Placer les filtres en tags
 */
