import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { resultStyles } from '../styles/result.styles';

export default function ResultScreen() {
    return (
        <View style={[globalStyles.container, globalStyles.center]}>
            <Text style={resultStyles.title}>Résultat</Text>
            <Text>Tenue recommandée ici</Text>
        </View>
    );
}