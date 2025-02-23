import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useVoiceInput from '../../hooks/useVoiceInput';
import { useState } from 'react';

const PANTRY_ITEMS = [
  { id: 1, name: 'Milk', quantity: '1L', expiryDate: '2024-02-20' },
  { id: 2, name: 'Eggs', quantity: '12', expiryDate: '2024-02-25' },
  { id: 3, name: 'Bread', quantity: '1 loaf', expiryDate: '2024-02-18' },
];

export default function PantryScreen() {
  const { isListening, error, startListening, stopListening } = useVoiceInput();
  const [items, setItems] = useState(PANTRY_ITEMS);

  const handleVoiceInput = async () => {
    try {
      const newItems = await startListening();
      if (Array.isArray(newItems) && newItems.length > 0) {
        setItems(prevItems => [
          ...prevItems,
          ...newItems.map((item: any, index: number) => ({
            id: prevItems.length + index + 1,
            ...item,
            expiryDate: '2024-03-01', // Default expiry date
          })),
        ]);
      }
    } catch (err) {
      console.error('Voice input error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Quick Actions</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="scan-outline" size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Scan Receipt</Text>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, isListening && styles.activeButton]}
            onPress={isListening ? stopListening : handleVoiceInput}
          >
            {isListening ? (
              <ActivityIndicator color="#007AFF" />
            ) : (
              <Ionicons name="mic-outline" size={24} color="#007AFF" />
            )}
            <Text style={styles.actionButtonText}>
              {isListening ? 'Listening...' : 'Voice Input'}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Add Item</Text>
          </Pressable>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.title}>Pantry Items</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              </View>
              <Text style={styles.expiryDate}>Expires: {item.expiryDate}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: '#E3F2FF',
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'center',
  },
  errorContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#8E8E93',
  },
  expiryDate: {
    fontSize: 12,
    color: '#FF3B30',
  },
});