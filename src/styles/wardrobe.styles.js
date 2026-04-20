import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const wardrobeStyles = StyleSheet.create({
    // ── Écran ──────────────────────────────────────────────
    screen: {
        flex: 1,
        backgroundColor: '#F4F6FB',
    },

    // ── Header ─────────────────────────────────────────────
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1A2E',
    },
    headerCount: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: '600',
    },

    // ── Liste ──────────────────────────────────────────────
    list: {
        padding: 16,
        paddingBottom: 90,
    },
    loader: {
        flex: 1,
        marginTop: 60,
    },

    // ── État vide ──────────────────────────────────────────
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 6,
    },
    emptyHint: {
        fontSize: 14,
        color: '#999',
    },

    // ── Carte vêtement ─────────────────────────────────────
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: 12,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
    },
    cardLeft: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#EEF3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardIcon: {
        fontSize: 26,
    },
    cardBody: {
        flex: 1,
    },
    cardName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 2,
    },
    cardMeta: {
        fontSize: 13,
        color: '#666',
        textTransform: 'capitalize',
        marginBottom: 3,
    },
    cardTemp: {
        fontSize: 12,
        color: '#4A90E2',
    },
    deleteBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    deleteBtnText: {
        color: '#E53935',
        fontWeight: '700',
        fontSize: 14,
    },

    // ── FAB ────────────────────────────────────────────────
    fab: {
        position: 'absolute',
        bottom: 28,
        right: 24,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    fabText: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '300',
    },

    // ── Modal ──────────────────────────────────────────────
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 20,
        textAlign: 'center',
    },

    // ── Formulaire ─────────────────────────────────────────
    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
        marginBottom: 6,
        marginTop: 14,
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#DDE3F0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        color: '#1A1A2E',
        backgroundColor: '#FAFBFF',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfField: {
        flex: 1,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        paddingVertical: 4,
    },

    // ── Selector chips ─────────────────────────────────────
    selectorContainer: {
        marginBottom: 4,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#DDE3F0',
        marginRight: 8,
        backgroundColor: '#FAFBFF',
    },
    chipActive: {
        borderColor: '#4A90E2',
        backgroundColor: '#EEF3FF',
    },
    chipText: {
        fontSize: 13,
        color: '#555',
    },
    chipTextActive: {
        color: '#4A90E2',
        fontWeight: '700',
    },

    // ── Boutons modal ──────────────────────────────────────
    modalActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
        marginBottom: 8,
    },
    btnCancel: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#DDE3F0',
        alignItems: 'center',
    },
    btnCancelText: {
        color: '#555',
        fontWeight: '600',
        fontSize: 15,
    },
    btnAdd: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#4A90E2',
        alignItems: 'center',
    },
    btnAddText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
});
