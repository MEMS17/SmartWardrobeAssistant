import { GEMINI_API_KEY, GEMINI_API_URL } from '@env';

/**
 * Génère une recommandation de tenue via Google Gemini
 * @param {Object} weather - Les données météo {temperature, weatherCode}
 * @param {Array} wardrobeItems - Liste des vêtements disponibles
 * @returns {Promise<Object>} {outfit: [], explanation: string}
 */
export const generateOutfitRecommendation = async (weather, wardrobeItems) => {
    try {
        if (!GEMINI_API_KEY || !GEMINI_API_URL) {
            throw new Error('Variables d\'environnement Gemini manquantes');
        }

        if (!wardrobeItems || wardrobeItems.length === 0) {
            throw new Error('Aucun vêtement dans l\'armoire');
        }

        // Créer un prompt précis pour Gemini
        const prompt = buildOutfitPrompt(weather, wardrobeItems);

        // Appeler l'API Gemini
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': GEMINI_API_KEY,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Erreur API Gemini: ${response.status} - ${
                    errorData.error?.message || 'Erreur inconnue'
                }`
            );
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            throw new Error('Réponse vide de Gemini');
        }

        // Parser la réponse de Gemini
        const parsedResult = parseGeminiResponse(aiResponse, wardrobeItems);

        return parsedResult;
    } catch (error) {
        console.error('Erreur IA:', error.message);
        throw error;
    }
};

/**
 * Construit le prompt pour demander une tenue à Gemini
 */
function buildOutfitPrompt(weather, wardrobeItems) {
    const weatherLabel = getWeatherCondition(weather.weatherCode);
    const temperature = weather.temperature;

    const wardrobeJSON = JSON.stringify(wardrobeItems, null, 2);

    return `Tu es un styliste personnel expert.

MÉTÉO ACTUELLE:
- Température: ${temperature}°C
- Conditions: ${weatherLabel}

ARMOIRE DISPONIBLE (VÊTEMENTS UNIQUEMENT):
${wardrobeJSON}

INSTRUCTIONS STRICTES:
1. RECOMMANDE UNIQUEMENT des vêtements qui existent dans la liste ci-dessus
2. Suggère une tenue COMPLÈTE adaptée à la température et aux conditions météo
3. Réponds au format JSON VALIDE (parsable):

{
  "outfit": [
    {"id": "...", "name": "...", "reason": "..."},
    {"id": "...", "name": "...", "reason": "..."}
  ],
  "explanation": "Explication générale de la tenue",
  "tips": "Conseils supplémentaires (optionnel)"
}

IMPORTANT: 
- Les IDs et noms doivent correspondre EXACTEMENT à ceux de la liste
- Utilise au moins 2-3 pièces
- Respecte les limites de température (temperatureMin, temperatureMax)
- Si isWaterproof=true, c'est idéal pour la pluie

Réponds UNIQUEMENT avec le JSON, sans texte additionnel.`;
}

/**
 * Récupère le label de condition météo
 */
function getWeatherCondition(code) {
    if (code === 0) return 'Ensoleillé';
    if (code <= 3) return 'Nuageux';
    if (code <= 48) return 'Brouillard';
    if (code <= 67) return 'Pluie';
    if (code <= 77) return 'Neige';
    if (code <= 99) return 'Orage';
    return 'Inconnu';
}

/**
 * Parse la réponse JSON de Gemini
 */
function parseGeminiResponse(aiResponse, wardrobeItems) {
    try {
        // Nettoyer la réponse (enlever les backticks markdown si présents)
        let cleanedResponse = aiResponse
            .replace(/^```json\n?/i, '')
            .replace(/\n?```$/i, '')
            .trim();

        const parsed = JSON.parse(cleanedResponse);

        // Valider que les IDs correspondent
        if (parsed.outfit && Array.isArray(parsed.outfit)) {
            parsed.outfit = parsed.outfit.map((item) => {
                const wardrobeItem = wardrobeItems.find((w) => w.id === item.id);
                return {
                    ...item,
                    // Assurez-vous que les données existent
                    name: item.name || wardrobeItem?.name || 'Vêtement',
                };
            });
        }

        return {
            outfit: parsed.outfit || [],
            explanation: parsed.explanation || '',
            tips: parsed.tips || '',
        };
    } catch (error) {
        console.error('Erreur parsing réponse Gemini:', error);
        throw new Error(
            `Impossible de parser la réponse de l'IA: ${error.message}`
        );
    }
}
