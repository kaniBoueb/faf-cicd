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

function filtreHome() {
        // Sélectionnez les champs de sélection
        var categorySelect = document.getElementById('category_voiture_filters');
        var marqueSelect = document.getElementById('marque_voiture_filters');
        var rangeInputs = document.querySelectorAll('.range-input input');
    
        // Sélectionnez la liste de voitures
        var voitureList = document.querySelector('.les-autres-voitures');
    
        // Ajoutez des gestionnaires d'événements aux champs de sélection
        categorySelect.addEventListener('change', function() {
            filterVoitures();
        });
    
        if (marqueSelect) {
            marqueSelect.addEventListener('change', function() {
                filterVoitures();
            });
            
        }
    
        rangeInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                filterVoitures();
            });
        });
    
        // Fonction pour filtrer les voitures
        function filterVoitures() {
            var filterCategory = categorySelect.options[categorySelect.selectedIndex].getAttribute('data-filter');
            var filterMarque = marqueSelect.options[marqueSelect.selectedIndex].getAttribute('data-filter');
            var minDistance = parseInt(document.querySelector('.input-min').value);
            var maxDistance = parseInt(document.querySelector('.input-max').value);
    
            var voitures = voitureList.querySelectorAll('.une-voiture');
    
            voitures.forEach(function(voiture) {
                var categories = voiture.classList;
                var marques = voiture.classList;
                var distance = parseInt(voiture.getAttribute('data-distance'));
    
                var shouldDisplay = true;
    
                if (filterCategory !== 'all_categ' && !categories.contains(filterCategory)) {
                    shouldDisplay = false;
                }
    
                if (filterMarque !== 'all_marque' && !marques.contains(filterMarque)) {
                    shouldDisplay = false;
                }
    
                if (distance < minDistance || distance > maxDistance) {
                    shouldDisplay = false;
                }
    
                if (shouldDisplay) {
                    voiture.style.display = 'block';
                } else {
                    voiture.style.display = 'none';
                }
            });
        }
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
                    marqueSelect.appendChild(option);
                });

                // 4. Ajoutez un gestionnaire d'événements sur le sélecteur "marque"
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


// Appel de la fonction une fois que le DOM est chargé
// document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {
        faq();
        range();
        filtreOccasion();
        filtreReprise();
        toutesMarques();
        faqPopup();

        const slideValue = document.querySelector(".filtre-km .range .sliderValue span");
        const inputSlider = document.querySelector(".filtre-km .range input");
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
        // inputSlider.onblur = (()=>{
        //     slideValue.classList.remove("show");
        // });

        $(document).on("click", ".linkedin_share", function() {
            var url_partage = $(this).attr("data-href");
            var titre_popup = $(this).attr("data-titre");
            var texte = $(this).attr("data-texte");
            var largeur_popup = 500;
            var hauteur_popup = 500;
            partageLinkedin(titre_popup, texte, url_partage, largeur_popup, hauteur_popup);
        });

        var lesBtn = document.querySelectorAll('.steps-step a');
        lesBtn.forEach(function(unBtn){
            unBtn.addEventListener('click', function (e) {
                e.preventDefault();
            })
        });

    }
    // });