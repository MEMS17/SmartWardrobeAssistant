import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 25,
        textAlign: 'center',
    },
    weatherCard: {
        width: '85%',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#f2f4f7',
    },
    cityText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    weatherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherIcon: {
        marginRight: 10,
    },
    weatherText: {
        fontSize: 18,
        fontWeight: '500',
    },
    loadingText: {
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
    },
    buttonContainer: {
        width: '85%',
        marginBottom: 15,
    },
});