import AsyncStorage from '@react-native-async-storage/async-storage';

const WARDROBE_KEY = '@wardrobe_items';

/**
 * Charge tous les vêtements depuis AsyncStorage
 * @returns {Promise<ClothingItem[]>}
 */
export async function loadWardrobe() {
    try {
        const json = await AsyncStorage.getItem(WARDROBE_KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.error("Erreur lors du chargement de l'armoire :", error);
        return [];
    }
}

/**
 * Sauvegarde toute la liste dans AsyncStorage
 * @param {ClothingItem[]} items
 */
async function saveWardrobe(items) {
    try {
        await AsyncStorage.setItem(WARDROBE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'armoire :", error);
        throw error;
    }
}

/**
 * Ajoute un vêtement et persiste la liste
 * @param {ClothingItem} newItem
 * @returns {Promise<ClothingItem[]>} la liste mise à jour
 */
export async function addClothingItem(newItem) {
    const current = await loadWardrobe();
    const updated = [...current, newItem];
    await saveWardrobe(updated);
    return updated;
}

/**
 * Supprime un vêtement par son id et persiste la liste
 * @param {string} itemId
 * @returns {Promise<ClothingItem[]>} la liste mise à jour
 */
export async function deleteClothingItem(itemId) {
    const current = await loadWardrobe();
    const updated = current.filter(item => item.id !== itemId);
    await saveWardrobe(updated);
    return updated;
}

/**
 * Efface toute l'armoire (utile pour les tests)
 */
export async function clearWardrobe() {
    await AsyncStorage.removeItem(WARDROBE_KEY);
}
