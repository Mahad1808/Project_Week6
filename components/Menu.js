import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      category: 'Cakes',
      items: [
        { id: 1, name: 'Chocolate Cake', image: require('../assets/choc.jpg'), price: 800, description: 'A rich and decadent chocolate cake.', rating: 4 },
        { id: 2, name: 'Marble Cake', image: require('../assets/mc.jpg'), price: 600, description: 'A moist and flavorful marble cake.', rating: 3.5 },
        { id: 3, name: 'Cupcake', image: require('../assets/cup.jpg'), price: 200, description: 'A small and delicious cupcake.', rating: 4.5 },
      ],
    },
    {
      id: 2,
      category: 'Brownies',
      items: [
        { id: 1, name: 'Chocolate Brownie', image: require('../assets/brownies.jpg'), price: 200 , description: 'A rich and decadent chocolate brownie.', rating: 4},
        { id: 2, name: 'Walnut Brownie', image: require('../assets/wb.jpg') , price: 250 , description: 'A rich and decadent walnut brownie.', rating: 4.5},
        { id: 3, name: 'Diet Brownie', image: require('../assets/db.jpg'), price: 300  , description: 'A rich and decadent diet brownie.', rating: 3.5},
      ],
    },
    {
      id: 3,
      category: 'Cookies',
      items: [
        { id: 1, name: 'Chocolate Cookie', image: require('../assets/cookies.jpg'), price: 150 , description: 'A rich and decadent chocolate cookie.', rating: 4},
        { id: 2, name: 'ChocoChipie', image: require('../assets/cc.jpg') , price: 200 , description: 'A rich and decadent chocochip cookie.', rating: 4.5},
        { id: 3, name: 'Walnut & Almond Cookie', image: require('../assets/wac.jpg'), price: 250 , description: 'A rich and decadent walnut and almond cookie.', rating: 3.5 },
      ],
    },
    // ...rest of the menuItems data
  ]);

  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.items.some((menuItem) =>
      menuItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  
    const handleItemPress = (selectedItem) => {
      // Navigate to OrderScreen and pass the selected item's image
      navigation.navigate('Order', { selectedProduct: selectedItem });
    };
    const renderMenuItem = ({ item }) => {
    return (
      <View style={styles.menuItem}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <FlatList
          data={item.items}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.menuItemContainer}>
              <Image source={item.image} style={styles.menuItemImage} />
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemLabel}>Price: </Text>
              <Text style={styles.productPrice}>Rs.{item.price}</Text>
              <Text style={styles.menuItemLabel}>Description: </Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemLabel}>Rating: </Text>
              <View style={styles.ratingContainer}>
  {[1, 2, 3, 4, 5].map((starIndex) => (
    <Icon
      key={starIndex}
      name={starIndex <= Math.floor(item.rating) ? 'star' : 'star-o'}
      size={16}
      color='#F4BA7A'
      style={styles.starIcon}
    />
  ))}
</View>

            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Menu</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B67F60',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemLabel: {
    fontWeight: 'bold',
  },
  productRating: {
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
  },
  productRating: {
    fontSize: 16,
  },
  menuItemContainer: {
    marginRight: 10,
  },
  menuItemImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    // alignItems: 'center',
    marginBottom: 5,
  //   alignSelf: 'center', // Align the image to the center horizontally
  // justifyContent: 'center', // Align the image to the center vertically
  },
  menuItemName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 25,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 5,
  },
});

export default Menu;



