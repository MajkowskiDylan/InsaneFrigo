import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
	

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const MyFridge = () => {
_searchIngr = () => {
		console.log('Recherche d\'un ingredient...');
	}

	return (
		<View style = { styles.mainView }>
			<View style = { styles.searchView }>
				<TextInput
					placeholder = "Ingredient's name"
					style = { styles.searchField }
				/>
				<TouchableHighlight onPress = { _searchIngr }>
					<View style = { styles.button }>
						<Image  style = { styles.searchIcon } source = { assets.hotIcon } />
					</View>
                   
				</TouchableHighlight>
                
			</View>
<View>
<Text>Sort by: Name Aisle</Text>
</View>
		</View>
    );
}

MyFridge.navigationOptions = {
	title: 'MyFridge',
};

export default MyFridge;

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