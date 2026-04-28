import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MONUMENTS = [
  {
    id: '1',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW0VNWfvExH9hjGhUu7ZgSN3hz-14PclGOcA&s',
    model: require('../../assets/models/tajmahal.glb'),
    initialScale: [0.005, 0.005, 0.005], // Taj Mahal was massive
  },
  {
    id: '2',
    name: 'Red Fort',
    location: 'Delhi',
    image: 'https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg',
    model: require('../../assets/models/red_fort_model.glb'),
    initialScale: [0.005, 0.005, 0.005], // Set to tiny scale just in case it's massive
  },
  {
    id: '3',
    name: 'Qutub Minar',
    location: 'Delhi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJQNF5sMMXmWmdeivkFTShmCbEmcNpWboAw&s',
    model: require('../../assets/models/qutub_minar.glb'),
    initialScale: [0.005, 0.005, 0.005],
  },
  {
    id: '4',
    name: 'Golden Temple',
    location: 'Amritsar, Punjab',
    image: 'https://images.unsplash.com/photo-1514222134-b57c18ce47a4?q=80&w=600&auto=format&fit=crop',
    model: require('../../assets/models/goldentemple.glb'),
    initialScale: [0.005, 0.005, 0.005],
  },
  {
    id: '5',
    name: 'Charminar',
    location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1623194017688-29206d44a2c5?q=80&w=600&auto=format&fit=crop',
    model: require('../../assets/models/charminar.glb'),
    initialScale: [0.005, 0.005, 0.005],
  },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ARScreen', { monument: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.arButton}>
          <Text style={styles.arButtonText}>View in AR</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Indian Monuments</Text>
      <Text style={styles.subHeader}>Select a monument to view in Augmented Reality</Text>
      <FlatList
        data={MONUMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subHeader: {
    fontSize: 16,
    color: '#718096',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#EDF2F7',
  },
  cardBody: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  arButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  arButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
