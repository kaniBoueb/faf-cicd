function faq() {
    // Sélectionne tous les éléments ayant la classe '.les-qr .question'
    var questionElements = document.querySelectorAll('.les-qr .question');

    // Ajoute un gestionnaire d'événements pour chaque élément 'question'
    questionElements.forEach(function(questionElement) {
        questionElement.addEventListener('click', function() {
            // Récupère la valeur de l'attribut 'data-id' de l'élément cliqué
            var tabId = this.getAttribute('data-id');

            // Supprime la classe 'ak-ouvert' de tous les éléments '.les-qr .question'
            document.querySelectorAll('.les-qr .question').forEach(function(element) {
                element.classList.remove('ak-ouvert');
            });

            // Supprime la classe 'ak-ouvert' de tous les éléments '.les-qr .reponse'
            document.querySelectorAll('.les-qr .reponse').forEach(function(element) {
                element.classList.remove('ak-ouvert');
            });

            // Ajoute la classe 'ak-ouvert' à l'élément cliqué '.les-qr .question'
            this.classList.add('ak-ouvert');
            
            // Ajoute la classe 'ak-ouvert' à l'élément ayant l'ID équivalent à 'tabId'
            document.getElementById(tabId).classList.add('ak-ouvert');
        });
    });

    // Sélectionne le premier élément '.les-qr une-qr:first-child .question'
    var firstQuestionElement = document.querySelector('.les-qr .une-qr:first-child .question');
    
    // Si le premier élément existe, déclenche son événement 'click'
    if (firstQuestionElement) {
        firstQuestionElement.click();
    }
}

function range(){
    // Range price
    const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
    let priceGap = 1000;

    priceInput.forEach(input =>{
        input.addEventListener("input", e =>{
            let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);
            
            if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
                if(e.target.className === "input-min"){
                    rangeInput[0].value = minPrice;
                    range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                }else{
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach(input =>{
        input.addEventListener("input", e =>{
            let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

            if((maxVal - minVal) < priceGap){
                if(e.target.className === "range-min"){
                    rangeInput[0].value = maxVal - priceGap
                }else{
                    rangeInput[1].value = minVal + priceGap;
                }
            }else{
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });
}

function filtreOccasion() {
    // Sélectionnez le champ de sélection de la marque
    var marqueSelect = document.getElementById('marque_voiture_filters');

    // Sélectionnez les éléments du filtre de distance
    var rangeInputs = document.querySelectorAll('.range-input input');

    // Sélectionnez la liste de voitures
    var voitureList = document.querySelector('.les-autres-voitures');

    // Ajoutez des gestionnaires d'événements aux champs de sélection
    if (marqueSelect) {
        marqueSelect.addEventListener('change', function() {
            filterVoitures();
        });
    }

    if (rangeInputs) {
        rangeInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                filterVoitures();
            });
        });
        
    }

    // Fonction pour filtrer les voitures
    function filterVoitures() {
        var filterMarque = marqueSelect.options[marqueSelect.selectedIndex].getAttribute('data-filter');
        var minDistance = parseInt(document.querySelector('.input-min').value);
        var maxDistance = parseInt(document.querySelector('.input-max').value);
    
        var voitures = voitureList.querySelectorAll('.une-voiture');
    
        voitures.forEach(function(voiture) {
            var marques = voiture.classList;
            var distance = parseInt(voiture.getAttribute('data-distance'));
    
            var shouldDisplay = true;
    
            if (filterMarque !== 'all_marque' && !marques.contains(filterMarque)) {
                shouldDisplay = false;
            }
    
            if (distance < minDistance || distance > maxDistance) {
                shouldDisplay = false;
            }
    
            if (shouldDisplay) {
                voiture.classList.remove('hidden');
            } else {
                voiture.classList.add('hidden');
            }
        });
    }    

}

function filtreReprise() {
    // Fonction pour mettre à jour les options du champ "Modèles"
    function updateModelOptions(selectedMarque) {
        var modeleSelect = document.getElementById('modele'); // ID du select "Modèles"
        var modelOptions = optionsData[selectedMarque];

        // Mettre à jour les options du select "Modèles"
        modeleSelect.innerHTML = modelOptions;
    }

    // Gérer l'événement de changement de la sélection de la marque
    var marqueSelect = document.getElementById('marque'); // ID du select "Marque"
    if (marqueSelect) {
        marqueSelect.addEventListener('change', function () {
            var selectedMarque = this.value; // Obtenir la valeur sélectionnée de la marque
            updateModelOptions(selectedMarque); // Mettre à jour les options du champ "Modèles"
        });
        
    }

}

function toutesMarques() {
    const marqueSelect = document.getElementById('marque');
    const modeleSelect = document.getElementById('modele');
    let data = null;

    // 1. Téléchargez le fichier JSON depuis l'URL de l'API
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                data = JSON.parse(this.responseText);

                // 2. Parcourez les données JSON pour extraire les entreprises uniques
                const companies = data.map(item => item.company);

                // 3. Remplissez le sélecteur "marque" avec les entreprises uniques
                companies.forEach(company => {
                    const option = document.createElement('option');
                    option.text = company;
                    option.value = company;
                    if (marqueSelect) {
                        marqueSelect.appendChild(option);
                    }
                });

                // 4. Ajoutez un gestionnaire d'événements sur le sélecteur "marque"
                if (marqueSelect) {
                    marqueSelect.addEventListener('change', function() {
                        const selectedCompany = this.value;
                        
                        // 5. Trouvez l'objet correspondant à l'entreprise sélectionnée
                        const companyData = data.find(item => item.company === selectedCompany);
    
                        // 6. Récupérez la liste des modèles associés à cette entreprise
                        const models = companyData.model;
    
                        // 7. Remplissez le sélecteur "modèle" avec les modèles associés
                        modeleSelect.innerHTML = '';
                        models.forEach(model => {
                            const option = document.createElement('option');
                            option.text = model;
                            option.value = model;
                            modeleSelect.appendChild(option);
                        });
                    });
                }
            } else {
                console.error('Erreur HTTP! Statut:', this.status);
            }
        }
    });

    xhr.open('GET', 'https://raw.githubusercontent.com/amirhosseinkhodaei/CarCompaniesWithModels/master/companyWithModel.json');
    xhr.send();
    
}

function partagerWhatsApp(titre, texte, url) {
    // Générer l'URL de partage WhatsApp
    const encodedText = encodeURIComponent(`${titre}\n${texte}\n${url}`);
    const whatsappURL = `whatsapp://send?text=${encodedText}`;

    // Rediriger vers l'URL WhatsApp
    window.location.href = whatsappURL;
}

function faqPopup() {
    // Récupérez les éléments du DOM
    const showPopupButton = document.getElementById('showPopup');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('closePopup');

    // Ajoutez un gestionnaire d'événements pour afficher le popup
    if (showPopupButton) {
        showPopupButton.addEventListener('click', function () {
            popup.style.display = 'block';
        });
    
        // Ajoutez un gestionnaire d'événements pour fermer le popup
        closePopupButton.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    
        // Fermez le popup lorsque l'utilisateur clique à l'extérieur de celui-ci
        window.addEventListener('click', function (event) {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });  
    }

}

// Fonction pour charger les données JSON depuis l'API
function loadCarData() {
        // URL de l'API
        const apiUrl = 'https://autorent.chezak.net/wp-content/themes/insign/data-car/all-sites-car.json';
    
        // Sélecteurs HTML
        const categorieSelect = document.getElementById('categorie_voiture_filtre');
        const marqueSelect = document.getElementById('marque_voiture_filtre');
        const modeleSelect = document.getElementById('modele_voiture_filtre');
    
        // Fonction pour remplir les options du sélecteur
        function fillSelect(select, options) {
            select.innerHTML = '';
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });
        }
    
        // Fonction pour filtrer les marques en fonction de la catégorie
        function filterBrands(category) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Filtrer les marques en fonction de la catégorie sélectionnée
                    const filteredBrands = data.filter(item => item.models.some(model => model.category === category));
                    const uniqueBrands = [...new Set(filteredBrands.map(item => item.company))];
                    fillSelect(marqueSelect, ['Marque', ...uniqueBrands]);
    
                    // Réinitialiser le sélecteur de modèle
                    fillSelect(modeleSelect, ['Modèle']);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        }
    
        // Fonction pour filtrer les modèles en fonction de la marque et de la catégorie
        function filterModels(brand, category) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Filtrer les modèles en fonction de la marque et de la catégorie sélectionnées
                    const filteredModels = data
                        .find(item => item.company === brand)
                        ?.models.filter(model => model.category === category) || [];
                    const uniqueModels = [...new Set(filteredModels.map(model => model.name))];
                    fillSelect(modeleSelect, ['Modèle', ...uniqueModels]);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        }
    
        // Ajouter un écouteur d'événements pour le sélecteur de catégorie
        categorieSelect.addEventListener('change', () => {
            const selectedCategory = categorieSelect.value;
            if (selectedCategory !== 'all_categorie') {
                filterBrands(selectedCategory);
            } else {
                // Réinitialiser le sélecteur de marque et de modèle
                fillSelect(marqueSelect, ['Marque']);
                fillSelect(modeleSelect, ['Modèle']);
            }
        });
    
        // Ajouter un écouteur d'événements pour le sélecteur de marque
        marqueSelect.addEventListener('change', () => {
            const selectedBrand = marqueSelect.value;
            const selectedCategory = categorieSelect.value;
            if (selectedBrand !== 'all_marque') {
                filterModels(selectedBrand, selectedCategory);
            } else {
                // Réinitialiser le sélecteur de modèle
                fillSelect(modeleSelect, ['Modèle']);
            }
        });
    
        // Chargement initial des catégories
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Récupérer toutes les catégories disponibles
                const allCategories = [...new Set(data.flatMap(item => item.models.map(model => model.category)))];
                fillSelect(categorieSelect, ['Catégorie', ...allCategories]);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    
        // Initialisation des sélecteurs
        fillSelect(marqueSelect, ['Marque']);
        fillSelect(modeleSelect, ['Modèle']);
    
}

function filterCars() {
    const categorieSelect = document.getElementById('categorie_voiture_filtre');
    const marqueSelect = document.getElementById('marque_voiture_filtre');
    const modeleSelect = document.getElementById('modele_voiture_filtre');

    const selectedCategory = categorieSelect.value;
    const selectedBrand = marqueSelect.value;
    const selectedModel = modeleSelect.value;

    // Sélectionner toutes les voitures dans le bloc "les-occasions"
    const cars = document.querySelectorAll('.les-occasions .une-voiture');

    cars.forEach(car => {
        const category = car.classList.contains(selectedCategory);
        const brand = car.classList.contains(selectedBrand);
        const model = car.classList.contains(selectedModel);

        // Vérifier si la voiture correspond aux sélections
        const shouldShowCar = (selectedCategory === 'all_categorie' || category) &&
            (selectedBrand === 'all_marque' || brand) &&
            (selectedModel === 'all_modeles' || model);

        // Afficher ou masquer la voiture en fonction du résultat
        car.style.display = shouldShowCar ? 'block' : 'none';
    });
}

// LES FONCTIONS POUR LES TAXOS CPT UI
async function get_api_data() {
    const apiUrl = 'https://autorent.chezak.net/wp-content/themes/insign/data-car/all-sites-car.json';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données de l\'API');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function create_taxonomy_terms(data) {
    // Assurez-vous que vous avez déjà enregistré les taxonomies "marques" et "modèles" dans votre thème WordPress.

    const brandsTaxonomy = 'marque'; // Remplacez par le nom de votre taxonomy "marques".
    const modelsTaxonomy = 'modele'; // Remplacez par le nom de votre taxonomy "modeles".

    const allBrands = [];
    const allModels = [];

    data.forEach(item => {
        const brand = item.company;
        const models = item.models;

        allBrands.push(brand);
        allModels.push(...models.map(model => model.name));
    });

    const uniqueBrands = [...new Set(allBrands)];
    const uniqueModels = [...new Set(allModels)];

    // Créez les termes de taxonomie "marques" et "modèles" s'ils n'existent pas déjà.
    // Vous pouvez utiliser wp_insert_term() pour créer de nouveaux termes.

    // Exemple pour créer les termes de taxonomie "marques" (assurez-vous d'avoir les bonnes informations de taxonomie) :
    /*
    uniqueBrands.forEach(brand => {
        wp_insert_term(brand, brandsTaxonomy, {
            description: '',
            slug: sanitize_title(brand),
        });
    });
    */

    // Exemple pour créer les termes de taxonomie "modèles" (assurez-vous d'avoir les bonnes informations de taxonomie) :
    /*
    uniqueModels.forEach(model => {
        wp_insert_term(model, modelsTaxonomy, {
            description: '',
            slug: sanitize_title(model),
        });
    });
    */
}

async function associate_taxonomy_terms(data) {
    const postType = 'voiture'; // Remplacez par le nom de votre CPT "voitures".
    const brandsTaxonomy = 'marque'; // Remplacez par le nom de votre taxonomy "marques".
    const modelsTaxonomy = 'modele'; // Remplacez par le nom de votre taxonomy "modeles".

    data.forEach(item => {
        const postId = item.id; // Remplacez par l'ID du CPT "voitures" correspondant.
        const brand = item.company;
        const models = item.models;

        // Associez chaque modèle au CPT "voitures" en utilisant les termes de taxonomie appropriés.
        models.forEach(model => {
            // Assurez-vous que vous avez déjà créé les termes de taxonomie pour les marques et les modèles.
            // Utilisez wp_set_post_terms() pour associer les termes au CPT.
            /*
            wp_set_post_terms(postId, [sanitize_title(brand)], brandsTaxonomy, true);
            wp_set_post_terms(postId, [sanitize_title(model.name)], modelsTaxonomy, true);
            */
        });
    });
}

async function init() {
    const apiData = await get_api_data();

    if (apiData) {
        create_taxonomy_terms(apiData);
        associate_taxonomy_terms(apiData);
    }
}

// Appelez init() au chargement de la page ou au moment approprié.
document.addEventListener('DOMContentLoaded', init);



// Appel de la fonction une fois que le DOM est chargé
// document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {
        faq();
        range();
        filtreOccasion();
        filtreReprise();
        toutesMarques();
        faqPopup();
        loadCarData();

        const slideValue = document.querySelector(".filtre-km .range .sliderValue span");
        const inputSlider = document.querySelector(".filtre-km .range input");
        if (inputSlider) {
            inputSlider.oninput = (()=>{
                let value = inputSlider.value;
                slideValue.textContent = value +" KM";
                const inputSliderWidth = inputSlider.offsetWidth; // Récupérez la largeur de inputSlider
                const slideValueWidth = slideValue.offsetWidth; // Récupérez la largeur de slideValue
                const offsetLeft = (inputSliderWidth * (value / inputSlider.max)) - (slideValueWidth / 2);
                slideValue.style.left = offsetLeft + "px";
                slideValue.classList.add("show");
                // slideValue.style.left = calc(50% - (width_of_slideValue / 2));
                // slideValue.classList.add("show");
            });
        }

        var lesBtn = document.querySelectorAll('.steps-step a');
        if (lesBtn) {
            lesBtn.forEach(function(unBtn){
                unBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                })
            });
        }

        // // Ajouter des écouteurs d'événements pour les sélecteurs de filtre
        // const categorieSelect = document.getElementById('categorie_voiture_filtre');
        // const marqueSelect = document.getElementById('marque_voiture_filtre');
        // const modeleSelect = document.getElementById('modele_voiture_filtre');

        // categorieSelect.addEventListener('change', filterCars);
        // marqueSelect.addEventListener('change', filterCars);
        // modeleSelect.addEventListener('change', filterCars);

    }
    // });