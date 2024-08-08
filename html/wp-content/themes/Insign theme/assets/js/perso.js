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

    // Récupérez les éléments du DOM
    const showPopupButton = document.getElementById('showPopup2');
    const popup = document.getElementById('popup2');
    
    // Ajoutez un gestionnaire d'événements pour afficher le popup
    if (showPopupButton) {
        const closePopupButton = document.getElementById('closePopupFaq');
        const content = popup.querySelector('#popup2 .popup-content');
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

function loadCarFiltreOccasion() {
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
    const categorieSelect = document.getElementById('categorie_voiture_filters');
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

function filtreOccasion() {
    var filters = {
        categorie: "all_categorie",
        marque: "all_marque",
        modele: "all_modele",
        prix: '',
        minDistance: 0,
        maxDistance: Infinity
    };

    var categorieSelect = document.getElementById('categorie_voiture_filters');
    var marqueSelect = document.getElementById('marque_voiture_filters');
    var modeleSelect = document.getElementById('modele_voiture_filters');
    var prixSelect = document.getElementById('prix_voiture_filters');
    var voitureList = document.querySelector('.les-autres-voitures');
    var rangeInputs = document.querySelectorAll('.range-input input');
    // var messageAucuneVoiture = document.querySelector('.message-aucune-voiture');

    // Créer dynamiquement l'élément de message
    var messageAucuneVoiture = document.createElement('div');
    messageAucuneVoiture.classList.add('message-aucune-voiture');
    messageAucuneVoiture.textContent = 'Oups! Aucune voiture trouvée...';
    messageAucuneVoiture.style.display = 'none'; // Initialement masqué

    // Ajouter l'élément de message au même conteneur que voitureList
    if (voitureList) {
        voitureList.parentNode.appendChild(messageAucuneVoiture);
    }

    if (modeleSelect) {
        modeleSelect.classList.add("ak-desactivated");
    }

    if (categorieSelect) {
        categorieSelect.addEventListener('change', function() {
            filters.categorie = categorieSelect.options[categorieSelect.selectedIndex].getAttribute('data-filter');

            if (filters.categorie === 'categorie') {
                marqueSelect.value = 'marque';
                modeleSelect.value = 'modele';
                filters.marque = 'marque';
                filters.modele = 'modele';
            }

            filterVoitures();
        });
    }

    if (marqueSelect) {
        marqueSelect.addEventListener('change', function() {
            filters.marque = marqueSelect.options[marqueSelect.selectedIndex].getAttribute('data-filter');

            if (filters.marque === 'marque') {
                modeleSelect.value = 'modele';
                filters.modele = 'modele';
            }
            filterVoitures();
            
            // Gérer l'affichage du modèle en fonction de la sélection de la marque
            if (filters.marque !== 'all_marque') {
                modeleSelect.classList.remove("ak-desactivated");
            } else {
                modeleSelect.classList.add("ak-desactivated");
            }
        });
    }

    if (modeleSelect) {
        modeleSelect.addEventListener('change', function() {
            filters.modele = modeleSelect.options[modeleSelect.selectedIndex].getAttribute('data-filter');
            filterVoitures();
        });
    }

    if (prixSelect) {
        prixSelect.addEventListener('change', function() {
            filters.prix = prixSelect.options[prixSelect.selectedIndex].value;
            filterVoitures();
        });
    }

    if (rangeInputs) {
        rangeInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                filters.minDistance = parseInt(document.querySelector('.input-min').value);
                filters.maxDistance = parseInt(document.querySelector('.input-max').value);
                filterVoitures();
            });
        });
    }

    function filterVoitures() {
        var voitures = voitureList.querySelectorAll('.une-voiture');
        var anyCarDisplayed = false;

        voitures.forEach(function(voiture) {
            var categories = voiture.classList;
            var marques = voiture.classList;
            var modeles = voiture.classList;
            var prix = parseInt(voiture.getAttribute('data-price'));
            var distance = parseInt(voiture.getAttribute('data-distance'));

            var shouldDisplay = true;

            // Filtre par catégories
            if (filters.categorie !== 'all_categorie' && !categories.contains(filters.categorie)) {
                shouldDisplay = false;
            }

            // Filtre par marque
            if (filters.marque !== 'all_marque' && !marques.contains(filters.marque)) {
                shouldDisplay = false;
            }

            // Filtre par modèle
            if (filters.modele !== 'all_modele' && !modeles.contains(filters.modele)) {
                shouldDisplay = false;
            }

            // Filtre par prix
            if (filters.prix === '6-15' && (prix < 6000000 || prix > 15999999)) {
                shouldDisplay = false;
            }

            if (filters.prix === '15-30' && (prix < 15000000 || prix > 31000000)) {
                shouldDisplay = false;
            }

            // Filtre par distance
            if (distance < filters.minDistance || distance > filters.maxDistance) {
                shouldDisplay = false;
            }

            // Nouvelles conditions d'affichage
            if (filters.categorie === 'categorie') {
                if (categories.contains(filters.categorie)) {
                    shouldDisplay = true;
                }
            }
            
            if (filters.categorie !== 'all_categorie' && filters.marque === 'marque') {
                if (categories.contains(filters.categorie)) {
                    shouldDisplay = true;
                }
            }

            if (filters.categorie !== 'all_categorie' && filters.marque !== 'marque' && filters.modele === 'modele') {
                if (categories.contains(filters.categorie) && marques.contains(filters.marque)) {
                    shouldDisplay = true;
                }
            }

            // Affichage des voitures en fonction des filtres
            if (shouldDisplay) {
                voiture.classList.remove('hidden');
                anyCarDisplayed = true;
            } else {
                voiture.classList.add('hidden');
            }
        });

        console.log(filters);

        // Afficher ou masquer le message d'aucune voiture trouvée
        messageAucuneVoiture.style.display = anyCarDisplayed ? 'none' : 'block';
    }
}

function filtreOccasionHP() {
    if (document.querySelector('body.page-id-14')) {
        var occasionElement = document.getElementById('occasions');
        if (occasionElement) {
            occasionElement.scrollIntoView({ behavior: 'smooth' });
        }
        var params = new URLSearchParams(window.location.search);
        if (params) {
            var categorieValue = params.get('categorie');
            var marqueValue = params.get('marque');
            var modeleValue = params.get('modele');
            if (categorieValue) {
                var voitureList = document.querySelector('.les-autres-voitures');
                var voitures = voitureList.querySelectorAll('.une-voiture');
                var anyCarDisplayed = false;
            
                // Valeurs par défaut pour prix, minDistance et maxDistance
                var marques = "all_marque";
                var modeles = "all_modele";
                var prix = '';
                var minDistance = 0;
                var maxDistance = Infinity;
            
                voitures.forEach(function(voiture) {
                    var categories = voiture.classList;
            
                    var shouldDisplay = true;
            
                    // Filtre par marque
                    if (categorieValue && !categories.contains(categorieValue)) {
                        shouldDisplay = false;
                    }
            
                    // Affichage des voitures en fonction des filtres
                    if (shouldDisplay) {
                        voiture.classList.remove('hidden');
                        anyCarDisplayed = true;
                    } else {
                        voiture.classList.add('hidden');
                    }
                });
            
                // Afficher ou masquer le message d'aucune voiture trouvée
                var messageAucuneVoiture = document.querySelector('.message-aucune-voiture');
                if (messageAucuneVoiture) {
                    messageAucuneVoiture.style.display = anyCarDisplayed ? 'none' : 'block';
                }
            }

            if (marqueValue) {
                var voitureList = document.querySelector('.les-autres-voitures');
                var voitures = voitureList.querySelectorAll('.une-voiture');
                var anyCarDisplayed = false;
            
                // Valeurs par défaut pour prix, minDistance et maxDistance
                var modeles = "all_modele";
                var prix = '';
                var minDistance = 0;
                var maxDistance = Infinity;
            
                voitures.forEach(function(voiture) {
                    var marques = voiture.classList;
                    // var modeles = voiture.classList;
            
                    var shouldDisplay = true;
            
                    // Filtre par marque
                    if (marqueValue && !marques.contains(marqueValue)) {
                        shouldDisplay = false;
                    }
            
                    // Filtre par modèle
                    // if (modeleValue && !modeles.contains(modeleValue)) {
                    //     shouldDisplay = false;
                    // }
            
                    // Affichage des voitures en fonction des filtres
                    if (shouldDisplay) {
                        voiture.classList.remove('hidden');
                        anyCarDisplayed = true;
                    } else {
                        voiture.classList.add('hidden');
                    }
                });
            
                // Afficher ou masquer le message d'aucune voiture trouvée
                var messageAucuneVoiture = document.querySelector('.message-aucune-voiture');
                if (messageAucuneVoiture) {
                    messageAucuneVoiture.style.display = anyCarDisplayed ? 'none' : 'block';
                }
            }

            if (modeleValue) {
                var voitureList = document.querySelector('.les-autres-voitures');
                var voitures = voitureList.querySelectorAll('.une-voiture');
                var anyCarDisplayed = false;
            
                // Valeurs par défaut pour prix, minDistance et maxDistance
                var prix = '';
                var minDistance = 0;
                var maxDistance = Infinity;
            
                voitures.forEach(function(voiture) {
                    var marques = voiture.classList;
                    var modeles = voiture.classList;
            
                    var shouldDisplay = true;
            
                    // Filtre par marque
                    if (marqueValue && !marques.contains(marqueValue)) {
                        shouldDisplay = false;
                    }
            
                    // Filtre par modèle
                    if (modeleValue && !modeles.contains(modeleValue)) {
                        shouldDisplay = false;
                    }
            
                    // Affichage des voitures en fonction des filtres
                    if (shouldDisplay) {
                        voiture.classList.remove('hidden');
                        anyCarDisplayed = true;
                    } else {
                        voiture.classList.add('hidden');
                    }
                });
            
                // Afficher ou masquer le message d'aucune voiture trouvée
                var messageAucuneVoiture = document.querySelector('.message-aucune-voiture');
                if (messageAucuneVoiture) {
                    messageAucuneVoiture.style.display = anyCarDisplayed ? 'none' : 'block';
                }
            }
        
        }
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

    xhr.open('GET', 'https://autorent.chezak.net/wp-content/themes/insign/data-car/all-cars.json');
    xhr.send();
    
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

function acheterVoiture() {
    // Récupérez les éléments du DOM
    const showPopupButton = document.getElementById('buy-car');
    
    // Ajoutez un gestionnaire d'événements pour afficher le popup
    if (showPopupButton) {
        const popup = document.getElementById('popup-acheter');
        const closePopupButton = document.getElementById('closePopup2');
        const content = document.querySelector('#popup-acheter .popup-content');
        var leTitre = document.querySelector('.infos-voiture .right-part .head-block h3');
        var iframe = document.querySelector('#hs-form-iframe-0');
        if (iframe) {
            var elm = iframe.contentWindow.document.querySelector("html body form .hs_vhicule_.hs-vhicule_ .input input");
            if (elm) {
                elm.value = leTitre.textContent;
            }
        }
        // elm.setAttribute('disabled', '');
        showPopupButton.addEventListener('click', function () {
            popup.style.display = 'block';
            setTimeout(() => {
                content.classList.add('ak-ouvert');
                // La valeur du champ véhicule dans le formulaire
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
function loadCarFiltreHP() {
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

function isEmpty(){
    var sectionVoiture = document.querySelector('.single-voiture .autres-voiture');
    if (sectionVoiture) {
        var listeVoiture = sectionVoiture.querySelector('.les-autres-voitures');
    
        if(listeVoiture.childElementCount < 1){
            sectionVoiture.classList.add("is-empty");
        }
    }
}

function menuBurger() {
    var burger = document.querySelector('.burger-menu');
    var burgerOff = document.querySelector('.burger-menu.close');
    var menu = document.querySelector('#custom-nav');
    if (burger) {
        burger.addEventListener('click', ()=>{
            menu.classList.add('ak-ouvert');
        });
    }

    if (burgerOff) {
        burgerOff.addEventListener('click', ()=>{
            menu.classList.remove('ak-ouvert');
        });
    }
}

function copyToClipboard() {
    // Sélectionnez l'élément avec l'ID "copy-link"
    var linkElement = document.getElementById("copy-link");
    if (linkElement) {
        // Obtenez la valeur de l'attribut "data-href" de l'élément
        var href = linkElement.getAttribute("data-href");
        
        linkElement.addEventListener('click', function () {
            // Créez un élément textarea pour stocker le lien
            var textarea = document.createElement("textarea");
            textarea.value = href;
            
            // Ajoutez l'élément textarea au corps du document
            document.body.appendChild(textarea);
            
            // Sélectionnez et copiez le contenu du textarea
            textarea.select();
            document.execCommand("copy");
            
            // Supprimez l'élément textarea du corps du document
            document.body.removeChild(textarea);
            
            // Créez un élément pour afficher le message
            var messageElement = document.createElement("div");
            messageElement.textContent = "Le lien a été copié dans le presse-papiers !";
            messageElement.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #2a8463; color: white; font-size: 16px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); z-index: 9999;";

            // Ajoutez l'élément de message au corps du document
            document.body.appendChild(messageElement);
            
            // Supprimez le message après 3 secondes
            setTimeout(function() {
                document.body.removeChild(messageElement);
            }, 3000);
        })
    }
}

window.onload = function() {
    loadCarFiltreOccasion();
    filtreOccasion();
    loadCarFiltreHP();
    filtreOccasionHP();
    filtreReprise();
    toutesMarques();
    faqPopup();
    faq();
    range();
    acheterVoiture();
    isEmpty();
    menuBurger();
    copyToClipboard();
    // filterCars();
    // partagerWhatsApp();

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

    // Toggle Bouton iframe
    const iframe = document.querySelector('.video-hero-banner iframe');
    if (iframe) {
        const muteButton = document.getElementById('toggleVolume');
        // Ajoutez un écouteur d'événements au bouton
        muteButton.addEventListener('click', function () {
            // Obtenez l'URL actuelle de l'iframe
            const currentSrc = new URL(iframe.src);

            // Vérifiez si le paramètre mute est déjà défini et a la valeur 1
            const isMuted = currentSrc.searchParams.get('mute') === '1';

            // Inversez la valeur mute
            const newMuteValue = isMuted ? '0' : '1';

            // Mettez à jour le paramètre mute dans l'URL
            currentSrc.searchParams.set('mute', newMuteValue);

            // Mettez à jour l'attribut src de l'iframe avec le nouvel URL
            iframe.src = currentSrc.toString();

            muteButton.style.backgroundImage = newMuteValue === '1'
                ? 'url("/wp-content/themes/insign/assets/images/volume-coupe.png")'
                : 'url("/wp-content/themes/insign/assets/images/le-volume.png")'
            ;
        });
    }

    // Select des prix
    var intervalSelect = document.getElementById('prix_voiture_filters');

    if (intervalSelect) {
        // Ajouter l'option "Entre 6 000 000 - 15 000 000"
        var option1 = document.createElement('option');
        option1.value = '6-15';
        option1.text = 'Entre 6 000 000 - 15 000 000';
    
        // Ajouter l'option "15 000 000 - 30 000 000"
        var option2 = document.createElement('option');
        option2.value = '15-30';
        option2.text = 'Entre 15 000 000 - 30 000 000';
    
        // Ajouter les options à la liste déroulante
        intervalSelect.appendChild(option1);
        intervalSelect.appendChild(option2);
    }

    // Search form
    if (document.querySelector('body.page-id-10')) {
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault(); 

            var marqueSelect = document.getElementById('marque_voiture_filtre');
            var modeleSelect = document.getElementById('modele_voiture_filtre');
        
            // Récupérer les valeurs des filtres sélectionnées
            var marqueValue = marqueSelect.value;
            var modeleValue = modeleSelect.value;
        
            // Construire l'URL avec les valeurs des filtres en tant que paramètres
            var url = '';

            if (marqueValue != '') {
                if (modeleValue != '' && modeleValue != 'Modèle') {
                    url = 'nos-occasions?marque=' + encodeURIComponent(marqueValue.toLowerCase().replace(/ö/g, "o")) + '&modele=' + encodeURIComponent(modeleValue.toLowerCase().replace(/ /g, "-"));
                }
                else if(modeleValue == '' || modeleValue == 'Modèle'){
                    url = 'nos-occasions?marque=' + encodeURIComponent(marqueValue.toLowerCase().replace(/ö/g, "o"));
                }
            }
        
            // Rediriger l'utilisateur vers la page suivante avec les valeurs des filtres
            window.location.href = url;
        });

        // Les FiltresBox de la HomePage 
        if (document.querySelectorAll('.confiance.home .une-box')) {
            document.querySelectorAll('.confiance.home .une-box').forEach((box) => {
                var urlVar = box.querySelector('span').textContent;
                box.addEventListener('click', () => {
                    var url = 'nos-occasions?categorie=' + encodeURIComponent(urlVar.toLowerCase().replace(/ /g, "-"));
                    // Rediriger l'utilisateur vers la page suivante avec les valeurs des filtres
                    window.location.href = url;
                });
            });
        }
    }

    // Ajout Link espace Pro
    if (document.querySelector('.pour-les-pros')) {
        document.querySelector('.pour-les-pros').addEventListener('click', function () {
            var url = '/nos-occasions?categorie=utilitaire';
            // Rediriger l'utilisateur vers la page suivante avec les valeurs des filtres
            window.location.href = url;
        })
    }

    // Ajout Link espace Pro
    if (document.querySelector('.espace-pro')) {
        document.querySelector('.espace-pro').addEventListener('click', function () {
            var url = '/nos-occasions?categorie=utilitaire';
            // Rediriger l'utilisateur vers la page suivante avec les valeurs des filtres
            window.location.href = url;
        })
    }
    
    // Init Swiper slider 
    const swiper = new Swiper('.swiper', {
        // autoplay: {
        //     delay: 2000
        // },
        speed: 1000,
        // spaceBetween: 100,
        loop: false,
        slidesPerView: 1,
        // spaceBetween: 10,
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
            slidesPerView: 1,
            spaceBetween: 0
            },
            // when window width is >= 480px
            480: {
            slidesPerView: 3,
            spaceBetween: 30
            },
            // when window width is >= 640px
            640: {
            slidesPerView: 1,
            spaceBetween: 10
            }
        },
        
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var leBlock = document.querySelector('.les-conseils.grid-actus');
    if (leBlock) {
        var lesEnfants = leBlock.querySelectorAll('.une-actu');
        if(lesEnfants.length <= 0){
            document.querySelector('.options.conseils').style.display="none";
        }
    }
    
    var leBlock2 = document.querySelector('.options .les-box');
    if (leBlock2) {
        var lesEnfants2 = document.querySelectorAll('.une-box');
        if(lesEnfants2.length <= 0){
            document.querySelector('.resume + .options').style.display="none";
        }
    }

    if(document.querySelector('#hs-form-iframe-0')){
        var parent = document.querySelector('#hs-form-iframe-0');
        var elm = parent.contentWindow.document.querySelector("html body .hbspt-form .submitted-message");

        if (elm) {
            elm.style.fontSize = '18px';
            elm.style.color = '#2a8463';
            elm.style.lineHeight = '78px';
            elm.style.textAlign = 'center';
            elm.style.width = '75%';
            elm.style.margin = '0 auto';
            elm.style.background = '#a6ffa663';
            elm.style.borderRadius = '18px';
        }
    }

    // Obtenez le texte de la phrase
    var phraseElement = document.querySelector(".page-id-12 .block-it h3.texte-vert");
    if (phraseElement) {
        var phrase = phraseElement.textContent;
        var mots = phrase.split(" ");
        var dernierMot = mots[mots.length - 1];
        var phraseFormattee = phrase.replace(dernierMot, "<span class='text-bold'>" + dernierMot + "</span>");
        phraseElement.innerHTML = phraseFormattee;
    }
    

    var phrase2 = document.querySelector(".page-id-12 .concession h2.texte-vert");
    if (phrase2) {
        var mots2 = phrase2.textContent.split(" ");
        var dernierMot2 = mots2[mots2.length - 1];
        var phraseFormattee2 = phrase2.textContent.replace(dernierMot2, "<span class='text-bold'>" + dernierMot2 + "</span>");
        document.querySelector(".page-id-12 .block-it h3.texte-vert, .page-id-12 .concession h2.texte-vert").innerHTML = phraseFormattee2;
    }

}