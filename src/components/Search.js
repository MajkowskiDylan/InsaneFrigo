import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image } from 'react-native';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Search = () => {

	// Recherche d'un aliment
	_searchItem = () => {
		console.log('Recherche d\'un alignment...');
	}

	return (
		<View style = { styles.mainView }>
			<View style = { styles.searchView }>
				<TextInput
					placeholder = 'Aliments...'
					style = { styles.searchField }
				/>
				<TouchableHighlight onPress = { _searchItem }>
					<View style = { styles.button }>
						<Image  style = { styles.searchIcon } source = { assets.hotIcon } />
					</View>
				</TouchableHighlight>
			</View>
		</View>
	);
}

Search.navigationOptions = {
	title: 'Search',
};

export default Search;

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