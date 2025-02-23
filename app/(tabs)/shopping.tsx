import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SHOPPING_LIST = [
  { id: 1, name: 'Tomatoes', quantity: '500g', price: '₹15', store: 'Walmart' },
  { id: 2, name: 'Chicken Breast', quantity: '1kg', price: '₹200', store: 'Costco' },
  { id: 3, name: 'Rice', quantity: '2kg', price: '₹150', store: 'Target' },
];

export default function ShoppingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Estimated Total:</Text>
          <Text style={styles.totalAmount}>₹365</Text>
        </View>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {SHOPPING_LIST.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.storeName}>{item.store}</Text>
              </View>
            </View>
            <View style={styles.itemActions}>
              <Pressable style={styles.actionButton}>
                <Ionicons name="cart-outline" size={20} color="#007AFF" />
                <Text style={styles.actionText}>Add to Cart</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Ionicons name="pricetag-outline" size={20} color="#007AFF" />
                <Text style={styles.actionText}>Find Deals</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#8E8E93',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 12,
    color: '#8E8E93',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    marginLeft: 4,
    color: '#007AFF',
    fontSize: 14,
  },
});