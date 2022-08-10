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

let recipesSec = document.getElementById("tags-bar");
const searchB = document.getElementById("search-bar");
let parentDiv = recipesSec.parentNode;

parentDiv.insertBefore(searchB, recipesSec);

const submissionBtn = document.getElementById("search");
// console.log(submissionBtn);
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
        // console.log(tabRecipes[recipe]);
      }
      if (tabRecipes[recipe].appliance.toLowerCase().includes(searchRecipes)) {
        filterRecipesTab.push(tabRecipes[recipe]);
        // console.log(tabRecipes[recipe]);
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
          // console.log(tabRecipes[recipe]);
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
          // console.log(tabRecipes[recipe]);
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
    // console.log(data);
    const ingredientsTab = Array.from(e[data].ingredients);
    // console.log(ingredientsTab);

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
    // console.log(nom);

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

// Création des différents champs de filtre
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
  ulFilter.setAttribute("id", "ulfilter-ing");
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
  inputFilter.addEventListener("input", subFilterIng);
  inputFilter.addEventListener("keyup", tagsIng);
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
  ulFilter.setAttribute("id", "ulfilter-app");
  ulFilter.setAttribute("class", "dropdown-menu ul-appareil");
  ulFilter.setAttribute("aria-labelledby", "dropdownMenuReference");

  let liFilter;

  for (let i = 0; i < tabAppareil.length; i++) {
    // console.log("et la2");
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

  inputFilter.addEventListener("input", subFilterApp);
  inputFilter.addEventListener("keyup", tagsIng);
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
  ulFilter.setAttribute("id", "ulfilter-ust");
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

  inputFilter.addEventListener("input", subFilterUst);
  inputFilter.addEventListener("keyup", tagsIng);
}
setTimeout(createUstFilter, 1000);

/**
 *  Objectif : Filtrer dans le filtre, la recherche de l'utilisateur (ne propose que le contenu qui contient l'input utilisateur)
 */

// Fonction de recherche dans les lsites après soumission par l'utilisateur
function subFilterIng(e) {
  //   console.log(tabIngredientListe);
  const searchRecipes = e.target.value.toLowerCase();

  let filterTagTab = [];

  if (document.getElementsByClassName("input-ingredient")) {
    for (let ingredient in tabIngredientListe) {
      if (!filterTagTab.includes(tabIngredientListe[ingredient])) {
        if (
            tabIngredientListe[ingredient].toLowerCase().includes(searchRecipes)
        ) {
          filterTagTab.push(tabIngredientListe[ingredient]);
          //   console.log(tabIngredientListe[ingredient]);
        }
      }
    }
  }
  refreshListeIng(filterTagTab);
}

function subFilterApp(e) {
  //   console.log(tabIngredientListe);
  const searchRecipes = e.target.value.toLowerCase();

  let filterTagTab = [];

  if (document.getElementsByClassName("input-appareil")) {
    // console.log("ca fonctionne ?");
    for (let appareil in tabAppareilListe) {
      if (!filterTagTab.includes(tabAppareilListe[appareil])) {
        // console.log(tabAppareilListe[appareil]);
        if (tabAppareilListe[appareil].toLowerCase().includes(searchRecipes)) {
          filterTagTab.push(tabAppareilListe[appareil]);
        }
      }
    }
  }
  // console.log(filterTagTab);
  refreshListeApp(filterTagTab);
}

function subFilterUst(e) {
  //   console.log(tabIngredientListe);
  const searchRecipes = e.target.value.toLowerCase();

  let filterTagTab = [];

  if (document.getElementsByClassName("input-ustensils")) {
    // console.log("ca fonctionne ?");
    for (let ustensil in tabUstensileListe) {
      if (!filterTagTab.includes(tabUstensileListe[ustensil])) {
        // console.log(tabUstensileListe[ustensil]);
        if (tabUstensileListe[ustensil].toLowerCase().includes(searchRecipes)) {
          filterTagTab.push(tabUstensileListe[ustensil]);
        }
      }
    }
  }
  // console.log(filterTagTab);
  refreshListeUst(filterTagTab);
}

//Fonctions de réaffichage des listes
function refreshListeIng(e) {
  // console.log(e);

  const removeRecipe = document.getElementById("ulfilter-ing");
  //   // vide la page
  removeRecipe.innerHTML = "";

  const filterTab = Array.from(e);
  // console.log(filterTab);

  let liFilter;

  // au clik récupère le .target et donne un id a l'élément
  // permet la création du tag

  for (let i = 0; i < filterTab.length; i++) {
    // console.log(filterTab.length);

    liFilter = document.createElement("li");
    liFilter.setAttribute("id", idCount++);
    liFilter.setAttribute("class", "lifilter");
    liFilter.textContent = filterTab[i];
    removeRecipe.appendChild(liFilter);
  }

  document.getElementById("dropdown-ingredients").appendChild(removeRecipe);
}

function refreshListeApp(e) {
  // console.log(e);

  const removeRecipe = document.getElementById("ulfilter-app");
  //   // vide la page
  removeRecipe.innerHTML = "";

  const filterTab = Array.from(e);
  // console.log(filterTab);

  let liFilter;

  // au clik récupère le .target et donne un id a l'élément
  // permet la création du tag

  for (let i = 0; i < filterTab.length; i++) {
    // console.log(filterTab.length);

    liFilter = document.createElement("li");
    liFilter.setAttribute("id", idCount++);
    liFilter.setAttribute("class", "lifilter");
    liFilter.textContent = filterTab[i];
    removeRecipe.appendChild(liFilter);
  }

  document.getElementById("dropdown-appareil").appendChild(removeRecipe);
}

function refreshListeUst(e) {
  // console.log(e);

  const removeRecipe = document.getElementById("ulfilter-ust");
  //   // vide la page
  removeRecipe.innerHTML = "";

  const filterTab = Array.from(e);
  // console.log(filterTab);

  let liFilter;

  // au clik récupère le .target et donne un id a l'élément
  // permet la création du tag

  for (let i = 0; i < filterTab.length; i++) {
    // console.log(filterTab.length);

    liFilter = document.createElement("li");
    liFilter.setAttribute("id", idCount++);
    liFilter.setAttribute("class", "lifilter");
    liFilter.textContent = filterTab[i];
    removeRecipe.appendChild(liFilter);
  }

  document.getElementById("dropdown-ustensils").appendChild(removeRecipe);
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

let ulTagsIng = document.getElementById("ultags-ing");
// Fonction de creation des tags
function createTag() {
  ulTagsIng.querySelectorAll("li").forEach((li) => li.remove());
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = document.createElement("li");
      liTag.textContent = tag;
      let iClose = document.createElement("i");
      iClose.setAttribute("class", "uit uit-multiply");

      ulTagsIng.appendChild(liTag);
      liTag.appendChild(iClose);

      iClose.addEventListener("click", remove);
    });
}

function remove(e) {
  window.event;

  const target = e.target;
  const parentTarget = target.parentNode;

  let child = parentTarget.firstChild.textContent;

  let index = null;

  for (let tag of tags) {
    // console.log(tag);
    // console.log(child);
    if (tag === child) {
      index = tags.indexOf(tag);
      // console.log(index);
      tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
      refreshRecipesFilter(tags);

      if(tags.length == 0){
        refreshRecipes(tabRecipes);
      }

      parentTarget.remove();
    }
  }
}

let tags = [];

// Récupération de l'input utilisateur (ecoute sur l'input) et création d'une carte tag
function tagsIng(e) {
  if (e.key == "Enter") {
    //récupation de l'input
    let tag = e.target.value.replace(/\s+/g, " ");
    // console.log(tag);
    if (tag.length > 1 && !tags.includes(tag)) {
      if (tags.length < 10) {
        tag.split(",").forEach((tag) => {
          tags.push(tag);
          createTag();
          refreshRecipesFilter(tags);
        });
      }
    }
    e.target.value = "";
  }
}

// Affiche les recettes en fonction des tags sélectionnées
function refreshRecipesFilter(e) {
  // console.log(e);
  let data = 0;
  
  const removeRecipe = document.getElementById("recipes");
  // vide la page
  removeRecipe.innerHTML = "";

  let tabEnter = e ;
  // console.log(tabEnter);
  let result = [];

  for (let recipe in tabRecipes) {
   
    if (!result.includes(tabRecipes[recipe])) {
      
      for(let i = 0; i < tabEnter.length; i++){
          if (tabRecipes[recipe].appliance.toLowerCase().includes(tabEnter[i])) {
          result.push(tabRecipes[recipe]);
        }
      }
      
      for (let ingredient in tabRecipes[recipe].ingredients){
        for(let i = 0; i < tabEnter.length; i++){
          if (tabRecipes[recipe].ingredients[ingredient].ingredient.toLowerCase().includes(tabEnter[i])) {
            result.push(tabRecipes[recipe]);
          }
        }
      }

      for (let ustensil in tabRecipes[recipe].ustensils) {
        for(let i = 0; i < tabEnter.length; i++){
          if (tabRecipes[recipe].ustensils[ustensil].toLowerCase().includes(tabEnter[i])) {
            result.push(tabRecipes[recipe]);
            // console.log(tabRecipes[recipe]);
          }
        }
      }
    }
  }

  console.log(result);

  for (data in result) {
    // console.log(data);
    const ingredientsTab = Array.from(result[data].ingredients);
    // console.log(ingredientsTab);

    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("id", result[data].id);
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
    nom.textContent = result[data].name;
    nom.setAttribute("class", "recipe-title");
    // console.log(nom);

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
    temps.textContent = result[data].time + " min";
    temps.setAttribute("class", "time");

    const recette = document.createElement("p");
    recette.textContent = result[data].description;
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
