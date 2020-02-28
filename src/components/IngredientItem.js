import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import { colors } from '../definitions/colors';

const IngredientItem = ({original, image}) => {
	return (
		<View style = {styles.mainView}>
			<Image style = {styles.img} source = {{uri: 'https://spoonacular.com/cdn/ingredients_100x100/' + image}}/>
			<Text style = {styles.txt}>{original}</Text>
		</View>
	);
}

export default IngredientItem;

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		flexDirection: "row",
		marginBottom: 5,
	},
	img: {
		flex: 1,
		width: 30,
		height: 30,
		marginRight: 10,
	},
	txt: {
		flex: 8,
	}
});