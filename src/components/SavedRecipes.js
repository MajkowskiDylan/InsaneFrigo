import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';

const SavedRecipes = (props) => {

	return (
		<View>
            <Text> SavedRecipes ! </Text>
			
		</View>
    );
}

SavedRecipes.navigationOptions = {
	title: 'SavedRecipes',
};

export default SavedRecipes;