# Djibli MVP - Application de livraison inter-villes

## Aperçu
Djibli est une application mobile de livraison inter-villes en Algérie, facilitant la connexion entre expéditeurs, points relais et chauffeurs.

## Fonctionnalités principales

### 1. Authentification et Gestion des comptes
- **Inscription séparée** pour chaque type d'utilisateur :
  - Client (expéditeur/destinataire)
  - Point relais (commerce partenaire)
  - Chauffeur
- **Vérification d'identité** avec scan de pièce d'identité
- **Informations spécifiques** par rôle

### 2. Gestion des Colis
- **Création de colis**
  - Formulaire détaillé
  - Choix du point relais
  - QR code unique
  - Bordereau d'expédition
- **Suivi avancé**
  - Statuts détaillés (5 étapes)
  - Photos à chaque transfert
  - Signatures électroniques
  - Notifications en temps réel
- **Gestion des retours**
  - Motifs de refus
  - Photos du colis
  - Réexpédition ou retour

### 3. Wallet Électronique
- **Opérations de base**
  - Solde en temps réel
  - Historique des transactions
  - Fonds bloqués/disponibles
- **Méthodes de paiement**
  - CIB
  - Edahabia
  - Espèces (points relais)
- **Transferts**
  - Entre utilisateurs
  - Vers compte bancaire
  - Retrait en espèces
- **Liens de paiement**
  - Pour produits sur place
  - Pour commandes avec livraison
  - Personnalisation complète

### 4. Interface Chauffeur
- **Gestion des missions**
  - Liste des missions disponibles
  - Détails des gains (200 DA/colis)
  - Acceptation/refus
- **Suivi des livraisons**
  - Scanner QR codes
  - Photos des colis
  - Signatures clients

### 5. Interface Point Relais
- **Gestion des colis**
  - Réception/remise
  - Commission par colis (100 DA)
  - Scanner QR codes
- **Mode hors ligne**
  - Scan sans connexion
  - Synchronisation automatique
  - Cache local

### 6. Analytiques et Rapports
- **Tableau de bord**
  - Nombre de colis traités
  - Commissions générées
  - Délais moyens
- **Performance**
  - Taux de réussite
  - Graphiques d'activité
  - Statistiques détaillées

### 7. Support et Réclamations
- **Centre de support**
  - Signalement de problèmes
  - Suivi des litiges
  - Chat/WhatsApp intégré

## Structure du projet
```
djibli-mvp/
├── index.html           # Page de connexion
├── register.html        # Inscription multi-rôles
├── dashboard.html       # Tableau de bord principal
├── nouveau-colis.html   # Création de colis
├── validation.html      # Validation de colis
├── track-package.html   # Suivi détaillé
├── returns.html         # Gestion des retours
├── wallet.html          # Wallet principal
├── wallet-transfer.html # Transferts et paiements
├── create-payment.html  # Création liens de paiement
├── chauffeur-missions.html  # Missions chauffeur
├── chauffeur-colis.html    # Colis chauffeur
├── relais.html         # Interface point relais
├── scan.html           # Scanner QR code
├── offline.html        # Mode hors ligne
├── analytics.html      # Tableau de bord analytique
└── sw.js              # Service Worker (mode hors ligne)
```

## Technologies utilisées
- HTML5, CSS3 (Tailwind CSS)
- JavaScript (Vanilla)
- Service Workers pour le mode hors ligne
- IndexedDB pour le stockage local
- Chart.js pour les graphiques
- QR Code API pour la génération/lecture

## Design
- Interface mobile-first
- Design moderne et épuré
- Navigation intuitive
- Thème personnalisé Djibli
