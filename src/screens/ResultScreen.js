import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Button,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { generateOutfitRecommendation } from '../services/aiService';
import { getWeather, getWeatherLabel } from '../services/weatherService';
import { loadWardrobe } from '../storage/wardrobeStorage';
import { globalStyles } from '../styles/globalStyles';
import { resultStyles } from '../styles/result.styles';

// Icônes emoji selon le type de vêtement (même système que WardrobeScreen)
const TYPE_ICON = {
    jacket: '🧥',
    top: '👕',
    bottom: '👖',
    shoes: '👟',
    accessory: '🎩',
};

const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 99) return '⛈️';
    return '☁️';
};

export default function ResultScreen({ navigation }) {
    const [recommendation, setRecommendation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wardrobe, setWardrobe] = useState([]);

    useEffect(() => {
        const fetchRecommendation = async () => {
            try {
                setLoading(true);
                setError(null);

                // Récupérer la météo et l'armoire
                const weatherData = await getWeather();
                const wardrobeData = await loadWardrobe();
                setWeather(weatherData);
                setWardrobe(wardrobeData);

                if (!wardrobeData || wardrobeData.length === 0) {
                    setError('Veuillez d\'abord ajouter des vêtements à votre armoire');
                    setLoading(false);
                    return;
                }

                // Générer la recommandation via l'IA
                const result = await generateOutfitRecommendation(
                    weatherData,
                    wardrobeData
                );

                setRecommendation(result);
            } catch (err) {
                setError(err.message || 'Erreur lors de la génération de la tenue');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendation();
    }, []);

    const handleRefresh = () => {
        setRecommendation(null);
        setLoading(true);
        setError(null);

        // Relancer la recommandation
        const fetchRecommendation = async () => {
            try {
                const weatherData = await getWeather();
                const wardrobeData = await loadWardrobe();
                setWeather(weatherData);
                setWardrobe(wardrobeData);

                if (!wardrobeData || wardrobeData.length === 0) {
                    setError('Veuillez d\'abord ajouter des vêtements à votre armoire');
                    setLoading(false);
                    return;
                }

                const result = await generateOutfitRecommendation(
                    weatherData,
                    wardrobeData
                );

                setRecommendation(result);
            } catch (err) {
                setError(err.message || 'Erreur lors de la génération de la tenue');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendation();
    };

    const renderOutfitItem = ({ item }) => {
        // Trouver le vêtement complet dans l'armoire
        const fullItem = wardrobe.find(w => w.id === item.id) || item;

        return (
            <View style={resultStyles.outfitItem}>
                <View style={resultStyles.itemIcon}>
                    <Text style={resultStyles.itemEmojiIcon}>{TYPE_ICON[fullItem.type] ?? '👔'}</Text>
                </View>
                <View style={resultStyles.itemContent}>
                    <Text style={resultStyles.itemName}>{item.name}</Text>
                    <Text style={resultStyles.itemReason}>{item.reason}</Text>
                    {fullItem.temperatureMin !== undefined && (
                        <Text style={resultStyles.itemTemp}>
                            🌡 {fullItem.temperatureMin}°C → {fullItem.temperatureMax}°C
                            {fullItem.isWaterproof ? '  💧' : ''}
                        </Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <ScrollView
            style={globalStyles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            {/* Carte météo */}
            {weather && (
                <View style={resultStyles.weatherCard}>
                    <Text style={resultStyles.weatherCity}>📍 Paris</Text>
                    <View style={resultStyles.weatherContent}>
                        <Text style={resultStyles.weatherEmojiLarge}>
                            {getWeatherEmoji(weather.weatherCode)}
                        </Text>
                        <View style={resultStyles.weatherInfo}>
                            <Text style={resultStyles.weatherTempLarge}>
                                {weather.temperature}°C
                            </Text>
                            <Text style={resultStyles.weatherConditionText}>
                                {getWeatherLabel(weather.weatherCode)}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            <Text style={resultStyles.title}>Tenue Recommandée</Text>

            {loading ? (
                <View style={[globalStyles.center, { marginTop: 40 }]}>
                    <ActivityIndicator size="large" color="#333" />
                    <Text style={resultStyles.loadingText}>
                        Génération de votre tenue...
                    </Text>
                </View>
            ) : error ? (
                <View style={resultStyles.errorContainer}>
                    <Text style={resultStyles.errorIcon}>⚠️</Text>
                    <Text style={resultStyles.errorText}>{error}</Text>
                    <View style={resultStyles.buttonContainer}>
                        <Button title="Réessayer" onPress={handleRefresh} />
                    </View>
                    <View style={resultStyles.buttonContainer}>
                        <Button
                            title="Aller à l'armoire"
                            onPress={() => navigation.navigate('Wardrobe')}
                            color="#3498db"
                        />
                    </View>
                </View>
            ) : recommendation ? (
                <View style={resultStyles.recommendationContainer}>
                    {/* Explication */}
                    <View style={resultStyles.explanationBox}>
                        <Text style={resultStyles.explanationTitle}>
                            Pourquoi cette tenue ?
                        </Text>
                        <Text style={resultStyles.explanationText}>
                            {recommendation.explanation}
                        </Text>
                    </View>

                    {/* Vêtements recommandés */}
                    <Text style={resultStyles.sectionTitle}>
                        Vêtements recommandés
                    </Text>
                    <FlatList
                        data={recommendation.outfit}
                        renderItem={renderOutfitItem}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        scrollEnabled={false}
                    />

                    {/* Conseils */}
                    {recommendation.tips && (
                        <View style={resultStyles.tipsBox}>
                            <Text style={resultStyles.tipsTitle}>💡 Conseils</Text>
                            <Text style={resultStyles.tipsText}>
                                {recommendation.tips}
                            </Text>
                        </View>
                    )}

                    {/* Boutons d'action */}
                    <View style={resultStyles.actionButtons}>
                        <View style={resultStyles.buttonContainer}>
                            <Button
                                title="Générer une autre tenue"
                                onPress={handleRefresh}
                            />
                        </View>
                        <View style={resultStyles.buttonContainer}>
                            <Button
                                title="Retour à l'accueil"
                                onPress={() => navigation.navigate('Home')}
                                color="#27ae60"
                            />
                        </View>
                    </View>
                </View>
            ) : null}
        </ScrollView>
    );
}