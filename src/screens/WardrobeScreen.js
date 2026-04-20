import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Switch,
    Modal,
    ScrollView,
    Alert,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { wardrobeStyles as styles } from '../styles/wardrobe.styles';
import { createClothingItem, CLOTHING_TYPES, CLOTHING_STYLES } from '../models/clothingItem';
import { loadWardrobe, addClothingItem, deleteClothingItem } from '../storage/wardrobeStorage';

// Icônes texte selon le type de vêtement
const TYPE_ICON = {
    jacket: '🧥',
    top: '👕',
    bottom: '👖',
    shoes: '👟',
    accessory: '🎩',
};

// ─── Composant carte vêtement ────────────────────────────────────────────────
function ClothingCard({ item, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <Text style={styles.cardIcon}>{TYPE_ICON[item.type] ?? '👔'}</Text>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardMeta}>
                    {item.style} · {item.color}
                </Text>
                <Text style={styles.cardTemp}>
                    🌡 {item.temperatureMin}°C → {item.temperatureMax}°C
                    {item.isWaterproof ? '  💧 Imperméable' : ''}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                    Alert.alert(
                        'Supprimer',
                        `Supprimer "${item.name}" ?`,
                        [
                            { text: 'Annuler', style: 'cancel' },
                            { text: 'Supprimer', style: 'destructive', onPress: () => onDelete(item.id) },
                        ]
                    )
                }
            >
                <Text style={styles.deleteBtnText}>✕</Text>
            </TouchableOpacity>
        </View>
    );
}

// ─── Composant sélecteur simple ───────────────────────────────────────────────
function Selector({ label, options, value, onChange }) {
    return (
        <View style={styles.selectorContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {options.map(opt => (
                    <TouchableOpacity
                        key={opt.value}
                        style={[styles.chip, value === opt.value && styles.chipActive]}
                        onPress={() => onChange(opt.value)}
                    >
                        <Text style={[styles.chipText, value === opt.value && styles.chipTextActive]}>
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

// ─── Formulaire d'ajout ───────────────────────────────────────────────────────
const DEFAULT_FORM = {
    name: '',
    type: 'top',
    style: 'casual',
    color: '',
    isWaterproof: false,
    temperatureMin: '10',
    temperatureMax: '20',
};

function AddClothingModal({ visible, onClose, onAdd }) {
    const [form, setForm] = useState(DEFAULT_FORM);
    const [loading, setLoading] = useState(false);

    const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            Alert.alert('Champ requis', 'Merci de saisir un nom pour le vêtement.');
            return;
        }
        if (!form.color.trim()) {
            Alert.alert('Champ requis', 'Merci de saisir une couleur.');
            return;
        }
        const min = Number(form.temperatureMin);
        const max = Number(form.temperatureMax);
        if (isNaN(min) || isNaN(max) || min >= max) {
            Alert.alert('Températures invalides', 'La température min doit être inférieure à la max.');
            return;
        }
        setLoading(true);
        try {
            const item = createClothingItem({ ...form, temperatureMin: min, temperatureMax: max });
            await onAdd(item);
            setForm(DEFAULT_FORM);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Ajouter un vêtement</Text>

                        {/* Nom */}
                        <Text style={styles.fieldLabel}>Nom *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex : Veste noire"
                            value={form.name}
                            onChangeText={v => set('name', v)}
                        />

                        {/* Type */}
                        <Selector
                            label="Type *"
                            options={CLOTHING_TYPES}
                            value={form.type}
                            onChange={v => set('type', v)}
                        />

                        {/* Style */}
                        <Selector
                            label="Style *"
                            options={CLOTHING_STYLES}
                            value={form.style}
                            onChange={v => set('style', v)}
                        />

                        {/* Couleur */}
                        <Text style={styles.fieldLabel}>Couleur *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex : noir, bleu marine…"
                            value={form.color}
                            onChangeText={v => set('color', v)}
                        />

                        {/* Températures */}
                        <View style={styles.row}>
                            <View style={styles.halfField}>
                                <Text style={styles.fieldLabel}>Temp. min (°C) *</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={form.temperatureMin}
                                    onChangeText={v => set('temperatureMin', v)}
                                />
                            </View>
                            <View style={styles.halfField}>
                                <Text style={styles.fieldLabel}>Temp. max (°C) *</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={form.temperatureMax}
                                    onChangeText={v => set('temperatureMax', v)}
                                />
                            </View>
                        </View>

                        {/* Imperméable */}
                        <View style={styles.switchRow}>
                            <Text style={styles.fieldLabel}>Imperméable</Text>
                            <Switch
                                value={form.isWaterproof}
                                onValueChange={v => set('isWaterproof', v)}
                                trackColor={{ true: '#4A90E2' }}
                            />
                        </View>

                        {/* Boutons */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
                                <Text style={styles.btnCancelText}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnAdd} onPress={handleSubmit} disabled={loading}>
                                {loading
                                    ? <ActivityIndicator color="#fff" />
                                    : <Text style={styles.btnAddText}>Ajouter</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

// ─── Écran principal ──────────────────────────────────────────────────────────
export default function WardrobeScreen() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // Rechargement à chaque fois que l'écran prend le focus
    useFocusEffect(
        useCallback(() => {
            let active = true;
            setLoading(true);
            loadWardrobe().then(data => {
                if (active) {
                    setItems(data);
                    setLoading(false);
                }
            });
            return () => { active = false; };
        }, [])
    );

    const handleAdd = async newItem => {
        const updated = await addClothingItem(newItem);
        setItems(updated);
    };

    const handleDelete = async id => {
        const updated = await deleteClothingItem(id);
        setItems(updated);
    };

    return (
        <SafeAreaView style={styles.screen}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👗 Mon Armoire</Text>
                <Text style={styles.headerCount}>{items.length} vêtement{items.length !== 1 ? 's' : ''}</Text>
            </View>

            {/* Liste */}
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#4A90E2" />
            ) : items.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>🧺</Text>
                    <Text style={styles.emptyText}>Votre armoire est vide</Text>
                    <Text style={styles.emptyHint}>Appuyez sur + pour ajouter un vêtement</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ClothingCard item={item} onDelete={handleDelete} />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}

            {/* Bouton flottant + */}
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>

            {/* Modal ajout */}
            <AddClothingModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={handleAdd}
            />
        </SafeAreaView>
    );
}
