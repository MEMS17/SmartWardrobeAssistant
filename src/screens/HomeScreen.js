// import React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

    const getWeatherIcon = (code) => {
        if (code === 0) return 'sun';
        if (code <= 3) return 'cloud-sun';
        if (code <= 48) return 'smog';
        if (code <= 67) return 'cloud-rain';
        if (code <= 77) return 'snowflake';
        if (code <= 99) return 'bolt';
        return 'cloud';
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
                        <Text style={homeStyles.cityText}>Paris</Text>

                        <View style={homeStyles.weatherRow}>
                            <FontAwesome5
                                name={getWeatherIcon(weather.weatherCode)}
                                size={22}
                                style={homeStyles.weatherIcon}
                            />
                            <Text style={homeStyles.weatherText}>
                                {weather.temperature}°C • {getWeatherLabel(weather.weatherCode)}
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
                    title="VOIR LE RÉSULTAT"
                    onPress={() => navigation.navigate('Result')}
                />
            </View>
        </View>
    );
}