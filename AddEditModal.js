import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, globalStyles } from '../globalStyles';

const COURSES = ['Starter', 'Main Course', 'Dessert'];

export const AddEditModal = ({ visible, onClose, onSave, itemToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setCourse(itemToEdit.course);
      setPrice(itemToEdit.price.toString());
    } else {
      resetForm();
    }
  }, [itemToEdit, visible]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setErrors({});
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Dish name is required.';
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
      valid = false;
    }
    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      id: itemToEdit ? itemToEdit.id : Date.now().toString(),
      name,
      description,
      course,
      price: parseFloat(price).toFixed(2),
    });

    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>
            {itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="e.g. Garlic Butter Prawns"
              value={name}
              onChangeText={setName}
            />
            {errors.name && <Text style={globalStyles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[globalStyles.input, globalStyles.textArea]}
              placeholder="e.g. Pan-seared prawns in garlic butter sauce..."
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
            {errors.description && (
              <Text style={globalStyles.errorText}>{errors.description}</Text>
            )}

            <Text style={styles.label}>Select Course</Text>
            <View style={styles.courseSelector}>
              {COURSES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.courseOption,
                    course === c && styles.selectedCourse,
                  ]}
                  onPress={() => setCourse(c)}
                >
                  <Text
                    style={[
                      styles.courseText,
                      course === c && styles.selectedCourseText,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="e.g. 120.00"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            {errors.price && <Text style={globalStyles.errorText}>{errors.price}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelBtn]}
                onPress={() => {
                  resetForm();
                  onClose();
                }}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveBtn]}
                onPress={handleSave}
              >
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    padding: 20,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  courseSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 2,
  },
  selectedCourse: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  courseText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  selectedCourseText: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: colors.textSecondary,
  },
  saveBtn: {
    backgroundColor: colors.primary,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
