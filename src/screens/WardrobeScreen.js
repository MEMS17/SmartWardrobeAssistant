import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { wardrobeStyles } from '../styles/wardrobe.styles';

export default function WardrobeScreen() {
    return (
        <View style={[globalStyles.container, globalStyles.center]}>
            <Text style={wardrobeStyles.title}>Armoire</Text>
            <Text>Liste des vêtements</Text>
        </View>
    );
}