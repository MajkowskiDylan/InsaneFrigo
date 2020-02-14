import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation } from 'react-native';
	
import IngredientSearch from './IngredientSearch';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';

const ShoppingList = ({navigation}) => {

	return (
		<View style = { styles.mainView }>
			<View>
				<IngredientSearch/>
			</View>
			<View>
				<Text> My Shopping List From API !</Text>
				<Button onPress={() => navigation.navigate('AddTo', {from: "my shopping list",})} title="Add ingredient"/>
			</View>
		</View>
    );
}

ShoppingList.navigationOptions = {
	title: 'ShoppingList',
};

export default ShoppingList;

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
	},
	searchView: {
		alignItems: 'stretch',
		flexDirection: 'row',
	},
	searchField: {
		flex: 1,
		height: 100,
		fontSize: 20,
		paddingLeft: 10,
		backgroundColor: colors.mainSilverColor,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
	},
	searchIcon: {
		width: 50,
		height: 50,
	}
});