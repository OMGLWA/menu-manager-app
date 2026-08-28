import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2A9D8F',
  secondary: '#E76F51',
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  textPrimary: '#264653',
  textSecondary: '#6C757D',
  border: '#E0E0E0',
  danger: '#E63946',
  accent: '#F4A261',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});V
