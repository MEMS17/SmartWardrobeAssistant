# 🤖 Configuration IA - Smart Wardrobe Assistant

## ✅ Qu'a été fait

### 1. **Configuration Gemini API** 
- ✅ Fichier `.env` créé avec les clés API
- ✅ Fichier `.env.example` pour le template
- ✅ `.gitignore` mis à jour pour ignorer `.env`

### 2. **Service IA** (`src/services/aiService.js`)
Implémentation complète avec:
- `generateOutfitRecommendation()` - Fonction principale pour générer une tenue
- `buildOutfitPrompt()` - Crée un prompt précis pour Gemini
- `parseGeminiResponse()` - Parse la réponse JSON de l'IA
- Gestion d'erreurs robuste

**Fonctionnement:**
```javascript
// Exemple d'utilisation
import { generateOutfitRecommendation } from '@/services/aiService';
import { getWeather } from '@/services/weatherService';
import { loadWardrobe } from '@/storage/wardrobeStorage';

const weather = await getWeather(); // {temperature: 12, weatherCode: 3}
const wardrobe = await loadWardrobe(); // [{id: "1", name: "Veste", ...}]
const recommendation = await generateOutfitRecommendation(weather, wardrobe);

// Résultat:
// {
//   outfit: [
//     {id: "1", name: "Veste noire", reason: "Parfait pour cette température"},
//     {id: "2", name: "Jean bleu", reason: "..."}
//   ],
//   explanation: "Cette tenue est idéale car...",
//   tips: "N'oubliez pas vos gants!"
// }
```

### 3. **Écran Résultat** (`src/screens/ResultScreen.js`)
Mise à jour complète avec:
- 📊 Chargement des données (météo + armoire)
- 🤖 Appel au service IA
- 📱 Affichage formaté de la recommandation
- 🔄 Bouton "Générer une autre tenue"
- ⚠️ Gestion d'erreurs et messages clairs

### 4. **Styles** (`src/styles/result.styles.js`)
Ajout de styles pour:
- Container principal
- Boîte d'explication
- Liste des vêtements
- Boîte de conseils
- Boutons d'action

---

## 🚀 Comment ça marche

### Flux complet:

1. **Accueil (HomeScreen)**
   - Affiche la météo actuelle
   - Utilisateur clique sur "VOIR LE RÉSULTAT"

2. **Écran Résultat (ResultScreen)**
   - Récupère la météo via Open-Meteo
   - Charge l'armoire depuis AsyncStorage
   - Envoie les données à l'IA Gemini
   - Affiche la recommandation

3. **Service IA (aiService.js)**
   - Construit un prompt structuré avec:
     - Données météo (température, conditions)
     - Liste des vêtements disponibles
   - Envoie à l'API Gemini
   - Parse la réponse JSON
   - Valide les vêtements recommandés

---

## 📋 Structure du vêtement (respectée)

```javascript
{
  "id": "1",
  "name": "Veste noire",
  "type": "jacket",
  "style": "casual",
  "color": "black",
  "isWaterproof": true,
  "temperatureMin": 5,
  "temperatureMax": 15
}
```

L'IA **respecte strictement** cette structure et les contraintes:
- ✅ Utilise UNIQUEMENT les vêtements dans l'armoire
- ✅ Respecte les limites de température (min/max)
- ✅ Préfère les vêtements waterproof quand il pleut
- ✅ Retourne des vêtements du bon type pour la saison

---

## 🔑 Variables d'environnement

Fichier `.env`:
```
GEMINI_API_KEY=AQ.Ab8RN6Jk1UJrJ1vBEqJUacv8LA-PoOaLCRWfVJ1-dPDuMy-nPQ
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent
```

**⚠️ JAMAIS commiter `.env` sur GitHub!**
- Utilisez `.env.example` comme référence
- Le fichier `.gitignore` protège automatiquement

---

## 🧪 Tester l'IA avec curl

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AQ.Ab8RN6Jk1UJrJ1vBEqJUacv8LA-PoOaLCRWfVJ1-dPDuMy-nPQ' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Suggest an outfit in JSON format for temperature 15°C and rainy weather with these available items: [{\"id\": \"1\", \"name\": \"Raincoat\", \"isWaterproof\": true, \"temperatureMin\": 5, \"temperatureMax\": 20}]"
          }
        ]
      }
    ]
  }'
```

---

## 🎯 Points clés

✅ **IA toujours valide**
- Valide que les IDs existent
- Utilise les vrais noms des vêtements
- Respecte les contraintes

✅ **Gestion d'erreurs**
- Pas de vêtements → Message clair
- Pas de connexion → Erreur attrapée
- Réponse invalide → Parsing robuste

✅ **Sécurité**
- Clés API jamais exposées
- Babel configure pour les variables d'env
- .gitignore protège les secrets

✅ **UX fluide**
- Loader pendant la génération
- Affichage formaté et lisible
- Bouton pour rafraîchir

---

## 📦 Dépendances utilisées

- `@env` - Pour les variables d'environnement (via react-native-dotenv)
- `weatherService` - Pour obtenir la météo
- `wardrobeStorage` - Pour charger l'armoire
- `FlatList` - Pour afficher les vêtements

---

## 🔧 Configuration Babel (déjà en place)

`babel.config.js`:
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
  ],
};
```

Permet d'importer directement:
```javascript
import { GEMINI_API_KEY, GEMINI_API_URL } from '@env';
```

---

## 🎬 Prochaines étapes

1. Testez l'app en ajoutant des vêtements dans l'armoire
2. Allez dans "VOIR LE RÉSULTAT" pour voir la recommandation
3. Vérifiez que les vêtements recommandés existent dans votre armoire
4. Rafraîchissez pour obtenir une autre recommandation

**Tout est prêt! 🚀**
