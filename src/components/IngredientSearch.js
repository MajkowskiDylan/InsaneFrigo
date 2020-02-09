import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
	

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';

const IngredientSearch = (props) => {

	_searchIngredient = () => {
		console.log('Recherche d\'un ingredient...');
	}

	const filters = ['Name', 'Aisle'];
	const { selectedButtonStyle, selectedTextStyle} = styles;
	return (
		<View>
			<View style = { styles.searchView }>
				<TextInput
					placeholder = "Ingredient's name"
					style = { styles.searchField }
				/>
				<TouchableHighlight onPress = { _searchIngredient }>
					<View style = { styles.button }>
						<Image  style = { styles.searchIcon } source = { assets.hotIcon } />
					</View>
				</TouchableHighlight>
			</View>

			<ButtonGroup selectedButtonStyle={selectedButtonStyle} selectedTextStyle={selectedTextStyle} buttons={filters}></ButtonGroup>
			<Button title="add ingredient"/>
		</View>
    );
}

export default IngredientSearch;

const styles = StyleSheet.create({
	selectedButtonStyle: {
		backgroundColor: 'red',
	},
	selectedTextStyle: {
		color: 'orange',
		fontWeight: '900',
	},
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
	},
	buttonContainer: {
		flexDirection: 'row',
		margin: 10
	  },
	  button: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#DCDCDC',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 20
	  },
	  checkedButton: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor:'#04549b'
	  }
});