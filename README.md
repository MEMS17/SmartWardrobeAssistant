# 👔 Smart Wardrobe Assistant

Une application mobile React Native qui aide les utilisateurs à choisir leur tenue quotidienne en fonction de la météo et de leur armoire virtuelle, avec recommandations générées par une IA.

## 🎯 Fonctionnalités principales

- **Gestion de l'armoire (CRUD)** - Ajouter, consulter, supprimer des vêtements
- **Météo en temps réel** - Récupération de la météo via Open-Meteo
- **Recommandation IA** - Génération intelligente de tenues via Google Gemini
- **Stockage local** - Persistance des données via AsyncStorage
- **Interface intuitive** - Navigation fluide et design épuré

## 🏗️ Architecture du projet

```
src/
├── models/              # Modèles de données
│   └── clothingItem.js
├── screens/             # Écrans principaux
│   ├── HomeScreen.js
│   ├── WardrobeScreen.js
│   └── ResultScreen.js
├── services/            # Services externes
│   ├── aiService.js
│   └── weatherService.js
├── storage/             # Gestion du stockage local
│   └── wardrobeStorage.js
├── styles/              # Fichiers de styles
│   ├── globalStyles.js
│   ├── home.styles.js
│   ├── wardrobe.styles.js
│   └── result.styles.js
└── navigation/          # Navigation
    └── AppNavigator.js
```

## 👥 Équipe développement

### 👨‍💻 Rayan — Gestion de l'armoire (CRUD)

**Responsabilités :**
- Création du modèle de vêtement avec structure imposée
- Implémentation de la persistance locale (AsyncStorage)
- Développement complet de l'écran Armoire

**Fichiers créés/modifiés :**
- `src/models/clothingItem.js` - Modèle ClothingItem avec génération d'ID unique
- `src/storage/wardrobeStorage.js` - Fonction de stockage (loadWardrobe, addClothingItem, deleteClothingItem, clearWardrobe)
- `src/screens/WardrobeScreen.js` - Écran avec FlatList, modale d'ajout, suppression avec confirmation
- `src/styles/wardrobe.styles.js` - Styles du formulaire et de la liste

**Détails techniques :**
- Modèle strictement conforme : id, name, type, style, color, isWaterproof, temperatureMin, temperatureMax
- Validation des données (température min < max)
- Confirmation avant suppression

---

### 🔧 Eddy — Initialisation & Intégration météo

**Responsabilités :**
- Initialisation complète du projet React Native
- Configuration de l'environnement de développement
- Architecture et organisation du code
- Intégration de la première version de la météo

**Fichiers créés/modifiés :**
- `src/services/weatherService.js` - Service API Open-Meteo
- `src/screens/HomeScreen.js` - Écran d'accueil (v1)
- `src/navigation/AppNavigator.js` - Configuration de la navigation
- Configuration Babel, ESLint, TypeScript
- `.env`, `metro.config.js`, `babel.config.js`

**Détails techniques :**
- Appel API Open-Meteo (gratuit, sans clé)
- Récupération : température, code météo
- Structure modulaire et évolutive

---

### 🤖 Souleymane — Implémentation IA (Gemini)

**Responsabilités :**
- Mise en place de l'intégration Google Gemini
- Développement du service IA
- Refactorisation complète de l'écran Résultat
- Gestion sécurisée des clés API

**Fichiers créés/modifiés :**
- `src/services/aiService.js` - Service Gemini complet
  - `generateOutfitRecommendation()` - Fonction principale
  - `buildOutfitPrompt()` - Création de prompts structurés
  - `parseGeminiResponse()` - Parser JSON robuste
- `src/screens/ResultScreen.js` - Écran Résultat refactorisé
- `src/styles/result.styles.js` - Styles complets
- `.env` et `.env.example` - Gestion des clés API
- `.gitignore` - Protection des données sensibles

**Détails techniques :**
- API Google Gemini (Flash)
- Prompt structuré envoyant météo + armoire
- Validation stricte des vêtements recommandés
- Gestion d'erreurs robuste
- Variables d'environnement via react-native-dotenv
- Parser JSON avec fallback markdown

---

### 🎨 Redouane — UI/UX & Rendu visuel

**Responsabilités :**
- Amélioration visuelle du HomeScreen
- Design de la carte météo
- Intégration de la météo au ResultScreen
- Boutons interactifs et ergonomie

**Fichiers modifiés :**
- `src/screens/HomeScreen.js` - Refactorisation visuelle
- `src/screens/ResultScreen.js` - Ajout carte météo
- `src/styles/home.styles.js` - Nouveau design (gradient, emojis)
- `src/styles/result.styles.js` - Styles météo et polissage

**Détails techniques :**
- Emojis météo intuitifs (☀️, ⛅, 🌧️, ❄️, ⛈️)
- Couleur bleu ciel (#5B9DD9) pour l'harmonie
- Shadows et border-radius pour la profondeur
- UX cohérente dans toute l'app

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 22.11.0
- Android Studio + émulateur (ou téléphone Android)
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone [votre-repo]
cd SmartWardrobeAssistant

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API
```

### Lancer l'app

**Terminal 1 - Bundler Metro :**
```bash
npm start -- --reset-cache
```

**Terminal 2 - Compilation & déploiement :**
```bash
npm run android
```

Pour iOS :
```bash
npm run ios
```

## 🔐 Configuration API

### Google Gemini
1. Créer un compte sur [AI Studio](https://aistudio.google.com/)
2. Générer une clé API
3. Ajouter dans `.env` :
```
GEMINI_API_KEY=votre_clé_ici
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent
```

### Météo (Open-Meteo)
Gratuit, aucune clé requise - l'API est déjà configurée

## 📱 Écrans principaux

### 1. HomeScreen 
Affichage de la météo actuelle avec deux boutons :
- "ALLER À L'ARMOIRE" - Gestion de l'armoire
- "MA TENUE ✨" - Génération de tenue (IA)

### 2. WardrobeScreen
Gestion complète de l'armoire :
- Visualiser la liste des vêtements
- Ajouter un vêtement (modale avec formulaire)
- Supprimer un vêtement
- Filtre par type, couleur, etc.

### 3. ResultScreen
Tenue recommandée :
- Affichage de la météo actuelle
- Liste des vêtements suggérés par l'IA
- Explication du choix
- Conseils supplémentaires
- Bouton pour générer une autre tenue

## 🛠️ Stack technique

- **Framework** : React Native 0.85.1
- **Navigation** : React Navigation 7.x
- **Stockage** : AsyncStorage
- **IA** : Google Gemini API
- **Météo** : Open-Meteo API
- **Styling** : StyleSheet (React Native)
- **Icônes** : Emojis + react-native-vector-icons
- **Dotenv** : react-native-dotenv

## 📦 Dépendances principales

```json
{
  "react": "19.2.3",
  "react-native": "0.85.1",
  "@react-navigation/native": "^7.2.2",
  "@react-navigation/native-stack": "^7.14.11",
  "@react-native-async-storage/async-storage": "^3.0.2",
  "react-native-dotenv": "^3.4.11"
}
```

## 🐛 Dépannage

### Erreur Metro File Watcher
Solution : voir [metro.config.js](metro.config.js) - exclusion des répertoires `.cxx`

### Build Gradle lent
```bash
cd android
gradlew clean
cd ..
npm start -- --reset-cache
npm run android
```

### Clé API manquante
Vérifier que `.env` est à la racine avec `GEMINI_API_KEY` définie

## 📝 Conventions de code

- **Nommage** : camelCase pour les fonctions, PascalCase pour les composants
- **Imports** : Grouper par type (React, React Native, dépendances, fichiers locaux)
- **Styles** : Un fichier `.styles.js` par écran
- **Structure** : Modèles → Services → Storage → Screens → Navigation

## ✅ Checklist de déploiement

- [ ] `.env` configuré (pas commité)
- [ ] `npm install` sans erreurs
- [ ] `npm start` lance Metro sans erreurs
- [ ] `npm run android` installe et lance l'app
- [ ] Armoire : CRUD fonctionne
- [ ] Météo : Données affichées correctement
- [ ] IA : Recommandations générées sans erreur
- [ ] Navigation : Transitions fluides

## 📄 Licence

Ce projet est la propriété du groupe de développement.

## 👋 Questions ?

Consultez les fichiers de documentation technique dans chaque répertoire `/src`

---

**Dernière mise à jour** : Avril 2026
**Status** : ✅ Fonctionnel - Prêt pour la production


For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
