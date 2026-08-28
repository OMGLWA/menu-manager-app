import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../globalStyles';

export const MenuItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.price}>R {parseFloat(item.price).toFixed(2)}</Text>
      </View>
      
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.course}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.button, styles.editBtn]} onPress={() => onEdit(item)}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={() => onDelete(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderColor: colors.border,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editBtn: {
    backgroundColor: colors.accent,
  },
  deleteBtn: {
    backgroundColor: colors.danger,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
