import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.email}>sarah.j@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Preferences</Text>
        <View style={styles.preferencesContainer}>
          <Pressable style={styles.preferenceTag}>
            <Text style={styles.preferenceText}>Vegetarian</Text>
          </Pressable>
          <Pressable style={styles.preferenceTag}>
            <Text style={styles.preferenceText}>Gluten-Free</Text>
          </Pressable>
          <Pressable style={[styles.preferenceTag, styles.addPreference]}>
            <Ionicons name="add" size={16} color="#007AFF" />
            <Text style={styles.addPreferenceText}>Add</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          {[
            { icon: 'notifications-outline', title: 'Notifications' },
            { icon: 'wallet-outline', title: 'Payment Methods' },
            { icon: 'location-outline', title: 'Preferred Stores' },
            { icon: 'shield-checkmark-outline', title: 'Privacy' },
            { icon: 'help-circle-outline', title: 'Help & Support' },
          ].map((setting, index) => (
            <Pressable key={index} style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons name={setting.icon as any} size={24} color="#1C1C1E" />
                <Text style={styles.settingTitle}>{setting.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  preferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preferenceTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  preferenceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  addPreference: {
    backgroundColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPreferenceText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  settingsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 12,
  },
});