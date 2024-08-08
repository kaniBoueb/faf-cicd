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

function loadFiltreOccasion() {

    function formatDataFilter(value) {
        var lowercaseValue = value.toLowerCase();
        var formattedValue = lowercaseValue.replace(/ /g, '-');
        // Supprimer les accents en utilisant une table de correspondance
        var accentTable = {
            'à': 'a', 'â': 'a', 'ä': 'a',
            'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
            'î': 'i', 'ï': 'i',
            'ô': 'o', 'ö': 'o',
            'ù': 'u', 'û': 'u', 'ü': 'u',
            'ÿ': 'y',
            'ç': 'c'
        };
    
        formattedValue = formattedValue.replace(/[àâäéèêëîïôöùûüÿç]/g, function(matched) {
            return accentTable[matched];
        });
    
        return formattedValue;
    }

    // URL de l'API
    const apiUrl = 'https://autorent.chezak.net/wp-content/themes/insign/data-car/all-sites-car.json';

    // Sélecteurs HTML
    const marqueSelect = document.getElementById('marque_voiture_filters');
    const modeleSelect = document.getElementById('modele_voiture_filters');

    // Fonction pour remplir les options du sélecteur
    function fillSelect(select, options) {
        select.innerHTML = '';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.setAttribute('data-filter', formatDataFilter(option));
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }

    // Fonction pour filtrer les modèles en fonction de la marque
    function filterModels(brand) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Filtrer les modèles en fonction de la marque sélectionnée
                const filteredModels = data
                    .find(item => item.company === brand)
                    ?.models || [];
                const uniqueModels = [...new Set(filteredModels.map(model => model.name))];
                fillSelect(modeleSelect, ['Modèle', ...uniqueModels]);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }

    // Ajouter un écouteur d'événements pour le sélecteur de marque
    if (marqueSelect) {
        marqueSelect.addEventListener('change', () => {
            const selectedBrand = marqueSelect.value;
            if (selectedBrand !== 'all_marque') {
                filterModels(selectedBrand);
            } else {
                // Réinitialiser le sélecteur de modèle
                fillSelect(modeleSelect, ['Modèle']);
            }
        });
    
        // Chargement initial des marques
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Récupérer toutes les marques disponibles
                const allBrands = [...new Set(data.map(item => item.company))];
                fillSelect(marqueSelect, ['Marque', ...allBrands]);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    
        // Initialisation des sélecteurs
        fillSelect(modeleSelect, ['Modèle']);
    }
}

function filtreOccasion() {
    // Sélectionnez le champ de sélection de la marque
    var marqueSelect = document.getElementById('marque_voiture_filters');
    var modeleSelect = document.getElementById('modele_voiture_filters');

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

    if (modeleSelect) {
        modeleSelect.addEventListener('change', function() {
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
        var filterModele = modeleSelect.options[modeleSelect.selectedIndex].getAttribute('data-filter');
        var minDistance = parseInt(document.querySelector('.input-min').value);
        var maxDistance = parseInt(document.querySelector('.input-max').value);
    
        var voitures = voitureList.querySelectorAll('.une-voiture');
    
        voitures.forEach(function(voiture) {
            var marques = voiture.classList;
            var modeles = voiture.classList;
            var distance = parseInt(voiture.getAttribute('data-distance'));
    
            var shouldDisplay = true;
    
            if (filterMarque !== 'all_marque' && !marques.contains(filterMarque)) {
                shouldDisplay = false;
            }

            if (filterModele !== 'all_marque' && !modeles.contains(filterModele)) {
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

function partagerWhatsApp() {
    // Définissez le message personnalisé et le lien
    const message = "Découvrez ce lien intéressant :";
    const lien = window.location;

    const btn = document.querySelector('.share-block a:first-child');

    // Générez le lien WhatsApp avec le message personnalisé
    const lienWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}%0A${encodeURIComponent(lien)}`;

    btn.addEventListener('click', function () {
        // Ouvrez le lien WhatsApp dans une nouvelle fenêtre ou un nouvel onglet
        window.open(lienWhatsApp, "_blank");
    });
}


function faqPopup() {
    // Récupérez les éléments du DOM
    const showPopupButton = document.getElementById('showPopup');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('closePopup');
    const content = popup.querySelector('.popup-content');

    // Ajoutez un gestionnaire d'événements pour afficher le popup
    if (showPopupButton) {
        showPopupButton.addEventListener('click', function () {
            popup.style.display = 'block';
            setTimeout(() => {
                content.classList.add('ak-ouvert');
            }, 500);
        });
    
        // Ajoutez un gestionnaire d'événements pour fermer le popup
        closePopupButton.addEventListener('click', function () {
            popup.style.display = 'none';
            content.classList.remove('ak-ouvert');

        });
    
        // Fermez le popup lorsque l'utilisateur clique à l'extérieur de celui-ci
        window.addEventListener('click', function (event) {
            if (event.target === popup) {
                popup.style.display = 'none';
                content.classList.remove('ak-ouvert');

            }
        });  
    }

}

// Fonction pour charger les données JSON depuis l'API
function loadCarData() {
    function formatDataFilter(value) {
        var lowercaseValue = value.toLowerCase();
        var formattedValue = lowercaseValue.replace(/ /g, '-');
        // Supprimer les accents en utilisant une table de correspondance
        var accentTable = {
            'à': 'a', 'â': 'a', 'ä': 'a',
            'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
            'î': 'i', 'ï': 'i',
            'ô': 'o', 'ö': 'o',
            'ù': 'u', 'û': 'u', 'ü': 'u',
            'ÿ': 'y',
            'ç': 'c'
        };
    
        formattedValue = formattedValue.replace(/[àâäéèêëîïôöùûüÿç]/g, function(matched) {
            return accentTable[matched];
        });
    
        return formattedValue;
    }
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
                optionElement.setAttribute('data-filter', formatDataFilter(option));
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
    
        if (categorieSelect) {
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
    
}

function filterCars() {
    // Sélectionnez le champ de sélection de la marque
    const categorieSelect = document.getElementById('categorie_voiture_filtre');
    const marqueSelect = document.getElementById('marque_voiture_filtre');
    const modeleSelect = document.getElementById('modele_voiture_filtre');


    // Sélectionnez la liste de voitures
    var voitureList = document.querySelector('#les-occasions .les-autres-voitures');

    // Ajoutez des gestionnaires d'événements aux champs de sélection
    if (categorieSelect) {
        categorieSelect.addEventListener('change', function() {
            filterVoitures();
        });
    }

    if (marqueSelect) {
        marqueSelect.addEventListener('change', function() {
            filterVoitures();
        });
    }

    if (modeleSelect) {
        modeleSelect.addEventListener('change', function() {
            filterVoitures();
        });
    }

    // Fonction pour filtrer les voitures
    function filterVoitures() {
        var filterCategorie = categorieSelect.options[categorieSelect.selectedIndex].getAttribute('data-filter');
        var filterMarque = marqueSelect.options[marqueSelect.selectedIndex].getAttribute('data-filter');
        var filterModele = modeleSelect.options[modeleSelect.selectedIndex].getAttribute('data-filter');
    
        var voitures = voitureList.querySelectorAll('.une-voiture');
    
        voitures.forEach(function(voiture) {
            var categories = voiture.classList;
            var marques = voiture.classList;
            var modeles = voiture.classList;
    
            var shouldDisplay = true;
    
            if (filterCategorie !== 'all_categorie' && !categories.contains(filterCategorie)) {
                shouldDisplay = false;
            }

            if (filterMarque !== 'all_marque' && !marques.contains(filterMarque)) {
                shouldDisplay = false;
            }

            if (filterModele !== 'all_modeles' && !modeles.contains(filterModele)) {
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


window.onload = function() {
    faq();
    range();
    loadFiltreOccasion();
    filtreOccasion();
    filtreReprise();
    toutesMarques();
    faqPopup();
    loadCarData();
    filterCars();
    partagerWhatsApp();

    const URL_DU_SITE = window.location.origin;
    const languageSelector = document.getElementById('qtranxs_select_qtranslate-chooser');
    setTimeout(() => {
        languageSelector.parentElement.classList.remove('ak-chargement');
    }, 700);
    for (let i = 0; i < languageSelector.options.length; i++) {
        const option1 = languageSelector.options[0];
        const option2 = languageSelector.options[1];
        // if (option.value === URL_DU_SITE+"/fr/") {
            option1.textContent = "FR";
        // } else if (option.value === URL_DU_SITE+"/en/") {
            option2.textContent = "EN";
        // }
    }
    

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

    // Sélectionnez le dernier enfant de l'élément avec la classe "steps-step"
    // const lastStep = document.querySelector(".steps-step:last-child");
    // const lastStepLink = lastStep.querySelector("a");
    // lastStepLink.removeAttribute("href");

    // var lesBtn = document.querySelectorAll('.steps-step a');
    // if (lesBtn) {
    //     lesBtn.forEach(function(unBtn){
    //         unBtn.addEventListener('click', function (e) {
    //             e.preventDefault();
    //         })
    //     });
    // }
        
}