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


// Appel de la fonction une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    faq();

    // Sélectionnez les champs de sélection
    var categorySelect = document.getElementById('category_voiture_filters');
    var marqueSelect = document.getElementById('marque_voiture_filters');

    // Sélectionnez la liste de voitures
    var voitureList = document.querySelector('.les-autres-voitures');

    // Ajoutez des gestionnaires d'événements aux champs de sélection
    categorySelect.addEventListener('change', function() {
        var selectedCategory = this.options[this.selectedIndex].getAttribute('data-filter');
        filterVoitures(selectedCategory);
    });

    marqueSelect.addEventListener('change', function() {
        var selectedMarque = this.options[this.selectedIndex].getAttribute('data-filter');
        filterVoitures(selectedMarque);
    });

    // Fonction pour filtrer les voitures
    function filterVoitures(filterValue) {
        var voitures = voitureList.querySelectorAll('.une-voiture');

        voitures.forEach(function(voiture) {
            var categories = voiture.classList;
            if (filterValue === 'all_categ' || categories.contains(filterValue)) {
                voiture.style.display = 'block';
            } else {
                voiture.style.display = 'none';
            }
        });
    }

});
