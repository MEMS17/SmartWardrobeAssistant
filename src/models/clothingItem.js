/**
 * Modèle d'un vêtement - structure imposée par le cahier des charges
 * @typedef {Object} ClothingItem
 * @property {string} id
 * @property {string} name
 * @property {string} type        - jacket | top | bottom | shoes | accessory
 * @property {string} style       - casual | formal | sport | outdoor
 * @property {string} color
 * @property {boolean} isWaterproof
 * @property {number} temperatureMin
 * @property {number} temperatureMax
 */

/**
 * Crée un nouvel objet vêtement avec un id unique
 * @param {Omit<ClothingItem, 'id'>} data
 * @returns {ClothingItem}
 */
export function createClothingItem(data) {
    return {
        id: Date.now().toString(),
        name: data.name,
        type: data.type,
        style: data.style,
        color: data.color,
        isWaterproof: data.isWaterproof ?? false,
        temperatureMin: Number(data.temperatureMin),
        temperatureMax: Number(data.temperatureMax),
    };
}

// Types et styles disponibles pour le formulaire
export const CLOTHING_TYPES = [
    { label: 'Veste / Manteau', value: 'jacket' },
    { label: 'Haut (t-shirt, pull…)', value: 'top' },
    { label: 'Bas (pantalon, jupe…)', value: 'bottom' },
    { label: 'Chaussures', value: 'shoes' },
    { label: 'Accessoire', value: 'accessory' },
];

export const CLOTHING_STYLES = [
    { label: 'Casual', value: 'casual' },
    { label: 'Formel', value: 'formal' },
    { label: 'Sport', value: 'sport' },
    { label: 'Outdoor', value: 'outdoor' },
];
