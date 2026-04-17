export const getWeather = async () => {
    try {
        // Paris (rapide pour tester)
        const latitude = 48.8566;
        const longitude = 2.3522;

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        const data = await response.json();

        return {
            temperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode,
        };
    } catch (error) {
        console.error("Erreur météo:", error);
        throw error;
    }
};

export const getWeatherLabel = (code) => {
    if (code === 0) return "Ensoleillé";
    if (code <= 3) return "Nuageux";
    if (code <= 48) return "Brouillard";
    if (code <= 67) return "Pluie";
    if (code <= 77) return "Neige";
    if (code <= 99) return "Orage";

    return "Inconnu";
};