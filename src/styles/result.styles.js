import { StyleSheet } from 'react-native';

export const resultStyles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
        color: '#333',
    },

    // Météo Card
    weatherCard: {
        marginHorizontal: 16,
        marginBottom: 25,
        paddingVertical: 20,
        paddingHorizontal: 18,
        borderRadius: 14,
        backgroundColor: '#5B9DD9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },

    weatherCity: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },

    weatherContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    weatherEmojiLarge: {
        fontSize: 48,
    },

    weatherInfo: {
        alignItems: 'flex-start',
    },

    weatherTempLarge: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },

    weatherConditionText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },

    // Loading & Error
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },

    errorContainer: {
        backgroundColor: '#fff3cd',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 16,
        marginTop: 40,
        alignItems: 'center',
    },

    errorIcon: {
        fontSize: 40,
        marginBottom: 10,
    },

    errorText: {
        fontSize: 16,
        color: '#856404',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 15,
    },

    // Recommendation Container
    recommendationContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    // Explanation Box
    explanationBox: {
        backgroundColor: '#ecf0f1',
        borderRadius: 8,
        padding: 15,
        marginBottom: 25,
        borderLeftWidth: 4,
        borderLeftColor: '#3498db',
    },

    explanationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },

    explanationText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },

    // Section Title
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginTop: 10,
    },

    // Outfit Item
    outfitItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    itemIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    itemEmojiIcon: {
        fontSize: 28,
    },

    itemContent: {
        flex: 1,
    },

    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },

    itemReason: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },

    itemTemp: {
        fontSize: 12,
        color: '#999',
        marginTop: 6,
    },

    // Tips Box
    tipsBox: {
        backgroundColor: '#d4edda',
        borderRadius: 8,
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#27ae60',
    },

    tipsTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#155724',
        marginBottom: 8,
    },

    tipsText: {
        fontSize: 13,
        color: '#155724',
        lineHeight: 18,
    },

    // Action Buttons
    actionButtons: {
        marginTop: 20,
        marginBottom: 30,
    },

    buttonContainer: {
        marginBottom: 10,
        borderRadius: 6,
        overflow: 'hidden',
    },
});