import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 30,
        textAlign: 'center',
        color: '#666',
    },
    weatherCard: {
        width: '90%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginBottom: 40,
        alignItems: 'center',
        backgroundColor: '#5B9DD9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    cityText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
        color: '#fff',
    },
    weatherEmoji: {
        marginBottom: 15,
    },
    weatherEmojiText: {
        fontSize: 64,
    },
    weatherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    weatherTemp: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    weatherCondition: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    loadingText: {
        fontSize: 16,
        color: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: '#ff6b6b',
    },
    buttonContainer: {
        width: '85%',
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
    },
});