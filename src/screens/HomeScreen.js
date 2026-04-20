// import React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getWeather, getWeatherLabel } from '../services/weatherService';
import { globalStyles } from '../styles/globalStyles';
import { homeStyles } from '../styles/home.styles';

export default function HomeScreen({ navigation }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getWeather();
                setWeather(data);
            } catch (error) {
                console.log('Erreur météo :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherEmoji = (code) => {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 48) return '🌫️';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '❄️';
        if (code <= 99) return '⛈️';
        return '☁️';
    };

    return (
        <View style={[globalStyles.container, globalStyles.center]}>
            <Text style={homeStyles.title}>Smart Wardrobe Assistant</Text>
            <Text style={homeStyles.subtitle}>Votre assistant météo et tenue du jour</Text>

            <View style={homeStyles.weatherCard}>
                {loading ? (
                    <Text style={homeStyles.loadingText}>Chargement météo...</Text>
                ) : weather ? (
                    <>
                        <Text style={homeStyles.cityText}>📍 Paris</Text>

                        <View style={homeStyles.weatherEmoji}>
                            <Text style={homeStyles.weatherEmojiText}>
                                {getWeatherEmoji(weather.weatherCode)}
                            </Text>
                        </View>

                        <View style={homeStyles.weatherRow}>
                            <Text style={homeStyles.weatherTemp}>
                                {weather.temperature}°C
                            </Text>
                            <Text style={homeStyles.weatherCondition}>
                                {getWeatherLabel(weather.weatherCode)}
                            </Text>
                        </View>
                    </>
                ) : (
                    <Text style={homeStyles.errorText}>Impossible de charger la météo</Text>
                )}
            </View>

            <View style={homeStyles.buttonContainer}>
                <Button
                    title="ALLER À L'ARMOIRE"
                    onPress={() => navigation.navigate('Wardrobe')}
                />
            </View>

            <View style={homeStyles.buttonContainer}>
                <Button
                    title="Générer une tenue ✨"
                    onPress={() => navigation.navigate('Result')}
                />
            </View>
        </View>
    );
}