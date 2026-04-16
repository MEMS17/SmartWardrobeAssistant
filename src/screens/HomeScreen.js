import React from 'react';
import { View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { homeStyles } from '../styles/home.styles';

export default function HomeScreen({ navigation }) {
    return (
        <View style={[globalStyles.container, globalStyles.center]}>
            <Text style={homeStyles.title}>Smart Wardrobe Assistant</Text>
            <Text style={homeStyles.subtitle}>Bienvenue sur l'écran d'accueil</Text>

            <View style={homeStyles.buttonContainer}>
                <Button
                    title="Aller à l'armoire"
                    onPress={() => navigation.navigate('Wardrobe')}
                />
            </View>

            <View style={homeStyles.buttonContainer}>
                <Button
                    title="Voir le résultat"
                    onPress={() => navigation.navigate('Result')}
                />
            </View>
        </View>
    );
}