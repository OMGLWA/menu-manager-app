import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { MenuItemCard } from './components/MenuItemCard';
import { AddEditModal } from './components/AddEditModal';
import { colors, globalStyles } from './globalStyles';

const INITIAL_MENU = [
  {
    id: '1',
    name: 'Creamy Mushroom Soup',
    description: 'Fresh wild mushrooms blended with cream and herbs.',
    course: 'Starter',
    price: '65.00',
  },
  {
    id: '2',
    name: 'Grilled Ribeye Steak',
    description: '300g Ribeye served with garlic butter and chips.',
    course: 'Main Course',
    price: '210.00',
  },
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center and vanilla ice cream.',
    course: 'Dessert',
    price: '75.00',
  },
];

export default function App() {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleSaveItem = (item) => {
    if (itemToEdit) {
      setMenuItems((prev) =>
        prev.map((existing) => (existing.id === item.id ? item : existing))
      );
      Alert.alert('Success', 'Menu item updated successfully.');
    } else {
      setMenuItems((prev) => [...prev, item]);
      Alert.alert('Success', 'New menu item added successfully.');
    }
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to remove this dish from the menu?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const handleOpenAdd = () => {
    setItemToEdit(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (item) => {
    setItemToEdit(item);
    setModalVisible(true);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCourse =
      selectedCourseFilter === 'All' || item.course === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header title="Chef's Menu Manager" />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={globalStyles.contentContainer}
        ListHeaderComponent={
          <>
            <StatsCard menuItems={menuItems} />

            <View style={styles.addBtnContainer}>
              <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
                <Text style={styles.addBtnText}>+ Add New Dish</Text>
              </TouchableOpacity>
            </View>

            <Text style={globalStyles.sectionTitle}>Filter & Search</Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Search dish by name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <View style={styles.filterContainer}>
              {['All', 'Starter', 'Main Course', 'Dessert'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    selectedCourseFilter === filter && styles.activeFilterChip,
                  ]}
                  onPress={() => setSelectedCourseFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCourseFilter === filter && styles.activeFilterChipText,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={globalStyles.sectionTitle}>
              Menu Items ({filteredItems.length})
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteItem}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No menu items found.</Text>
          </View>
        }
      />

      <AddEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveItem}
        itemToEdit={itemToEdit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addBtnContainer: {
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
