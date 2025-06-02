# Cahier des Charges - BoutiquePRO

## 1. Contexte et Définition du Projet

### Problématique
Dans un contexte commercial en pleine évolution numérique, les commerçants ont besoin d'une solution complète pour gérer leur boutique en ligne et leur inventaire. La digitalisation des processus commerciaux est devenue une nécessité pour rester compétitif sur le marché.

### Contraintes
- Respect des normes de sécurité pour les transactions en ligne
- Conformité avec le RGPD
- Interface utilisateur intuitive et responsive
- Performance optimale pour une expérience utilisateur fluide

## 2. Objectifs
Développer une plateforme e-commerce complète permettant aux commerçants de gérer efficacement leur boutique en ligne, leur inventaire, et leurs relations clients. La solution doit être facile à utiliser, sécurisée et évolutive pour répondre aux besoins croissants des utilisateurs.

## 3. Périmètre
- Gestion des produits et du catalogue
- Gestion des stocks
- Système de paiement sécurisé
- Gestion des commandes
- Interface d'administration
- Espace client
- Système de facturation
- Tableau de bord analytique

## 4. Parties Prenantes
- Commerçants (utilisateurs finaux)
- Clients de la boutique
- Équipe de développement
- Équipe de support technique
- Administrateurs système

## 5. Description des Besoins

### 5.1. Besoins Fonctionnels

| Objectif                  | Description                                                                 | Contraintes / Règles de Gestion                                  | Priorité    |
|---------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------|-------------|
| Gestion du Catalogue      | Création, modification et organisation des fiches produits (catégories, etc.) | Limite de taille pour les images produit (ex: 2MB), champs obligatoires (nom, prix) | Haute       |
| Gestion des Offres        | Définir et gérer les prix et les promotions pour les produits               | Application des promotions sur des périodes définies, conditions d'éligibilité | Haute       |
| Gestion des Stocks        | Suivre et mettre à jour les niveaux de stock                                | Alerte automatique lorsque le stock est inférieur à un seuil défini, décrémentation automatique après commande | Haute       |
| Gestion des Commandes     | Suivi en temps réel, retours, notifications                                 | Validation du paiement avant traitement, génération d'un numéro de suivi | Haute       |
| Facturation               | Génération automatique de factures                                          | Format PDF standard, inclure toutes les informations légales requises | Moyenne     |
| Compte Client             | Inscription, authentification, gestion du profil client                     | Validation de l'email, mot de passe sécurisé (min 8 caractères, chiffres, lettres) | Haute       |
| Parcours d'Achat Client   | Panier d'achat, historique des commandes, recherche de produits             | Affichage du total TTC, sauvegarde du panier pour utilisateurs connectés | Haute       |
| Tableau de Bord Admin     | Vue d'ensemble des métriques clés (ventes, stocks, etc.)                    | Accès restreint aux administrateurs                               | Haute       |
| Gestion des Utilisateurs  | Création, modification et suppression des comptes utilisateurs (clients/admin) | Rôles et permissions définis (ex: Admin, Gérant, Client)         | Haute       |
| Gestion des Droits        | Définir les permissions d'accès pour les différents rôles d'utilisateurs     | Basé sur les rôles utilisateurs                                  | Haute       |
| Rapports et Statistiques  | Génération de rapports sur les ventes, inventaires, etc.                     | Filtres par date, catégorie, statut (commandes)                 | Moyenne     |

### 5.2. Besoins Non Fonctionnels

| Objectif             | Description                                                                 | Contraintes / Règles de Gestion                      | Priorité    |
|----------------------|-----------------------------------------------------------------------------|------------------------------------------------------|-------------|
| Performance          | Temps de chargement, disponibilité, support utilisateurs simultanés           | Temps de chargement < 3s, Disponibilité 99.9%, 1000+ users | Haute       |
| Sécurité             | Protection des données, transactions, accès                                 | Chiffrement, protection attaques, 2FA, sauvegardes   | Haute       |
| Interface Utilisateur| Design responsive, compatibilité navigateurs, intuitivité, accessibilité     | Responsive, multi-navigateurs, intuitif, WCAG 2.1    | Haute       |

## 6. Technologies et Outils

### Backend
- Python/Django
- PostgreSQL
- Redis pour le cache
- Celery pour les tâches asynchrones

### Frontend
- React.js
- Material-UI
- Redux pour la gestion d'état
- Axios pour les requêtes HTTP

### Infrastructure
- Docker pour la conteneurisation
- Nginx comme serveur web
- AWS pour l'hébergement
- Git pour le versionnement

## Installation

### Prérequis
- Python 3.8+
- Node.js 14+
- PostgreSQL 12+
- Docker et Docker Compose

### Étapes d'installation

1. Cloner le repository
```bash
git clone https://github.com/votre-organisation/boutiquepro.git
cd boutiquepro
```

2. Configuration de l'environnement
```bash
cp .env.example .env
# Éditer le fichier .env avec vos configurations
```

3. Installation des dépendances
```bash
# Backend
python -m venv venv
source venv/bin/activate  # ou `venv\Scripts\activate` sur Windows
pip install -r requirements.txt

```
4. Configuration de la base de données
```bash
python manage.py migrate
python manage.py createsuperuser
```

5. Lancement de l'application
```bash
# Backend
python manage.py runserver

# Frontend
cd frontend
# Réinstaller les dépendances
npm install
```
## 7. Démarrer l'application avec la variable d'environnement pour OpenSSL
```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend : http://localhost:8000
- Interface d'administration : http://localhost:8000/admin
```
```
## 8.Demo sur PythonAnyWhere
[Une démonstration de l'application est disponible en ligne : ](https://zinebboulahbach.pythonanywhere.com/)
