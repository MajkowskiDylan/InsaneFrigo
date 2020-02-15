import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, FlatList, navigation } from 'react-native';
import IngredientSearch from './IngredientSearch';
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { fakeIngredients } from '../components/fakeDataTemp';
import MyItem from './MyItem';
const My = (props) => {
	const params = props.navigation.state.params;
	// params.origin fait référence à la page d'origine, par exemple si on a cliqué sur My Fridge ou My Shopping List dans la page Me.js
	const [ingredients, setIngredients] = useState([]);
	
	_searchIngredients = async () => {
		var apiSearchResult = [];
		try {
			apiSearchResult = ( await getIngredients() ); 
		} catch (error) {
			apiSearchResult = [];
		}
		setIngredients( apiSearchResult.ingredients );
		console.log(apiSearchResult);
	}

	return (
        <View>
			<IngredientSearch/>
            <Button onPress={() => props.navigation.navigate('AddTo', {src: params.origin,})} title="Add ingredient" />
            <Text> My { params.origin } List ! (Fixed) </Text>
			<FlatList
        data={ fakeIngredients }
        keyExtractor={ (item) => item.name.toString() }
        renderItem={ ({item}) => <MyItem ingredient={ item }/> }
      />
		</View>
    );
}

export default My;

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