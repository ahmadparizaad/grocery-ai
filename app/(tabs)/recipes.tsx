import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { generateRecipeSuggestions } from '../../lib/gemini';

const INITIAL_RECIPES = [
  {
    id: 1,
    name: 'Pasta Primavera',
    time: '30 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500',
  },
  {
    id: 2,
    name: 'Chicken Stir Fry',
    time: '25 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
  },
];

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecipeSuggestions();
  }, []);

  const loadRecipeSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get pantry items from your state management solution
      const pantryItems = [
        { name: 'Milk', quantity: '1L' },
        { name: 'Eggs', quantity: '12' },
        { name: 'Bread', quantity: '1 loaf' },
      ];

      const suggestions = await generateRecipeSuggestions(pantryItems);
      
      // Map the suggestions to include images
      const recipesWithImages = suggestions.map((recipe, index) => ({
        ...recipe,
        id: index + 1,
        image: `https://images.unsplash.com/photo-${1512058564366 + index}-18510be2db19?w=500`,
      }));

      setRecipes(recipesWithImages);
    } catch (err) {
      // setError('Failed to load recipe suggestions');
      console.error('Recipe suggestion error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#8E8E93" />
          <Text style={styles.searchText}>Search recipes...</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Recipes</Text>
          <Text style={styles.sectionSubtitle}>Based on your pantry items</Text>
          <Pressable 
            style={styles.refreshButton}
            onPress={loadRecipeSuggestions}
            disabled={loading}
          >
            <Ionicons 
              name="refresh-outline" 
              size={20} 
              color={loading ? '#8E8E93' : '#007AFF'} 
            />
          </Pressable>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Generating recipe suggestions...</Text>
          </View>
        ) : (
          recipes.map((recipe) => (
            <Pressable key={recipe.id} style={styles.recipeCard}>
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <View style={styles.recipeMetaInfo}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#8E8E93" />
                    <Text style={styles.metaText}>{recipe.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="stats-chart-outline" size={16} color="#8E8E93" />
                    <Text style={styles.metaText}>{recipe.difficulty}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 10,
  },
  searchText: {
    marginLeft: 8,
    color: '#8E8E93',
    fontSize: 16,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
    marginLeft: 8,
  },
  refreshButton: {
    padding: 8,
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#8E8E93',
    fontSize: 14,
  },
  errorContainer: {
    padding: 12,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  recipeMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 4,
    color: '#8E8E93',
    fontSize: 14,
  },
});