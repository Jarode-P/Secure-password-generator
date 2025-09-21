// ===================================================
// GÉNÉRATEUR DE MOT DE PASSE SÉCURISÉ
// Version simplifiée pour débutants
// ===================================================

// Les différents types de caractères qu'on peut utiliser
const CARACTERES = {
    minuscules: 'abcdefghijklmnopqrstuvwxyz',
    majuscules: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    chiffres: '0123456789',
    symboles: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Variables pour stocker les éléments HTML
let formulaire;
let champLongueur;
let caseMAjuscules;
let caseChiffres;
let caseSymboles;
let zoneMotDePasse;

// ===================================================
// FONCTION PRINCIPALE : GÉNÉRER UN MOT DE PASSE
// ===================================================

function genererMotDePasse() {
    // 1. Récupérer les choix de l'utilisateur
    const longueur = parseInt(champLongueur.value);
    const inclureMajuscules = caseMAjuscules.checked;
    const inclureChiffres = caseChiffres.checked;
    const inclureSymboles = caseSymboles.checked;
    
    // 2. Vérifier que la longueur est correcte
    if (longueur < 8 || longueur > 128) {
        alert('La longueur doit être entre 8 et 128 caractères');
        return;
    }
    
    // 3. Construire la liste des caractères possibles
    let caracteresDisponibles = CARACTERES.minuscules; // Toujours inclure les minuscules
    
    if (inclureMajuscules) {
        caracteresDisponibles += CARACTERES.majuscules;
    }
    if (inclureChiffres) {
        caracteresDisponibles += CARACTERES.chiffres;
    }
    if (inclureSymboles) {
        caracteresDisponibles += CARACTERES.symboles;
    }
    
    // 4. Générer le mot de passe
    let motDePasse = '';
    for (let i = 0; i < longueur; i++) {
        // Choisir un caractère au hasard
        const indexAleatoire = Math.floor(Math.random() * caracteresDisponibles.length);
        motDePasse += caracteresDisponibles[indexAleatoire];
    }
    
    // 5. Afficher le résultat
    afficherMotDePasse(motDePasse);
}

// ===================================================
// AFFICHER LE MOT DE PASSE GÉNÉRÉ
// ===================================================

function afficherMotDePasse(motDePasse) {
    // Créer l'HTML pour afficher le mot de passe
    zoneMotDePasse.innerHTML = `
        <div class="mot-de-passe-conteneur">
            <div class="mot-de-passe-texte">${motDePasse}</div>
            <button class="bouton-copier" onclick="copierMotDePasse('${motDePasse}')">
                Copier
            </button>
        </div>
        <div class="info-mot-de-passe">
            Longueur: ${motDePasse.length} caractères
        </div>
    `;
}

// ===================================================
// COPIER LE MOT DE PASSE
// ===================================================

function copierMotDePasse(motDePasse) {
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(motDePasse).then(function() {
        // Confirmer que c'est copié
        alert('Mot de passe copié !');
    }).catch(function() {
        // Si ça ne marche pas, proposer de sélectionner le texte
        alert('Impossible de copier automatiquement. Sélectionnez le texte manuellement.');
    });
}

// ===================================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ===================================================

function initialiser() {
    // Récupérer tous les éléments HTML dont on a besoin
    formulaire = document.getElementById('password-form');
    champLongueur = document.getElementById('length');
    caseMAjuscules = document.getElementById('uppercase');
    caseChiffres = document.getElementById('numbers');
    caseSymboles = document.getElementById('symbols');
    zoneMotDePasse = document.getElementById('generated-password');
    
    // Vérifier que tous les éléments existent
    if (!formulaire || !champLongueur || !caseMAjuscules || !caseChiffres || !caseSymboles || !zoneMotDePasse) {
        console.error('Erreur: un élément HTML est manquant');
        return;
    }
    
    // Quand on soumet le formulaire, générer un mot de passe
    formulaire.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        genererMotDePasse();
    });
    
    // Générer un mot de passe par défaut au chargement
    genererMotDePasse();
    
    console.log('Générateur de mot de passe prêt !');
}

// Démarrer quand la page est chargée
document.addEventListener('DOMContentLoaded', initialiser);
