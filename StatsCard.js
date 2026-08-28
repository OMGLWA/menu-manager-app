import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../globalStyles';

export const StatsCard = ({ menuItems }) => {
  const totalItems = menuItems.length;

  const averagePrice =
    totalItems > 0
      ? (menuItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0) / totalItems).toFixed(2)
      : '0.00';

  const starterCount = menuItems.filter((item) => item.course === 'Starter').length;
  const mainCount = menuItems.filter((item) => item.course === 'Main Course').length;
  const dessertCount = menuItems.filter((item) => item.course === 'Dessert').length;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Menu Overview & Statistics</Text>
      <View style={styles.row}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>R {averagePrice}</Text>
          <Text style={styles.statLabel}>Avg Price</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Course Breakdown:</Text>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownText}>Starters: <Text style={styles.bold}>{starterCount}</Text></Text>
        <Text style={styles.breakdownText}>Mains: <Text style={styles.bold}>{mainCount}</Text></Text>
        <Text style={styles.breakdownText}>Desserts: <Text style={styles.bold}>{dessertCount}</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: colors.border,
    borderWidth: 1,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.secondary,
  },
});
