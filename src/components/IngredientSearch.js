import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, FlatList, navigation } from 'react-native';
import MyItem from './MyItem';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { getIngredients } from '../api/spoonacular';
import { connect, dispatch } from 'react-redux';

const IngredientSearch = ({props, ingredientsName,saveIngredients, savedIngredients, dispatch}) => {
	const [filter, setFilter] = useState(0);
	const filters = ['Name', 'Aisle'];
	const [ingredientsData, setIngredientsData] = useState(null);
	const [isRefreshing, setRefreshingState] = useState( false );
	var searchTerm = "";
	console.log(props);
	_inputSearchTermChanged = (text) => {
		searchTerm = text;
	  }

	  _loadMoreIngredients = () => {
		console.log("End of the list");
	  }
	
    _searchIngredients = async (searchTerm) => {
		var apiSearchResult = [];
		var promises = [];
		var n = 2;
		try {
			A = ( await getIngredients(n, 'a') );
			B = ( await getIngredients(n, 'b'));
			D = ( await getIngredients(n, 'd'));
		} catch (error) {
			A = []; B = []; C = [];	D = [];	E = [];
			F = [];	G = [];	H = [];	I = [];	J = [];
			K = [];	L = [];	M = []; N = []; O = [];
			P = []; Q = []; R = []; S = []; T = [];
			U = []; V = []; W = []; X = []; Y = []; Z = [];
		}
		var apiSearchResult = [...B, ...D, ...A];
		if(filter == 1)
		{
			setIngredientsData( apiSearchResult.sort((a,b) =>
			{
				console.log(a.aisle + " et " + b.aisle);
				if(
					(!((a.aisle)).includes((b.aisle))) ||
					(!((b.aisle)).includes((a.aisle)))
					)
				{
					return -1
				}
				return 1
			}
			));
		}
		else
		{
			setIngredientsData( apiSearchResult.sort((a, b) => { return (a.name).localeCompare(b.name) }));
		}
		/*
		items.sort(function (a, b) {
  return a.localeCompare(b);
});
		*/
	}

	return (
		<View>
			<View style = { styles.searchView }>
				<TextInput
					placeholder = "Ingredient's name"
					style = { styles.searchField }
					onChangeText={ text => _inputSearchTermChanged(text) }
					onSubmitEditing={ _searchIngredients }
				/>
				<TouchableHighlight onPress={ _searchIngredients }>
					<View style = { styles.button }>
						<Image  style = { styles.searchIcon } source = { assets.searchIcon }/>
					</View>
				</TouchableHighlight>
			</View>
			<ButtonGroup onPress={filter => setFilter(filter)} selectedIndex={filter} buttons={filters}></ButtonGroup>
			<FlatList
        data={ ingredientsData }
		keyExtractor={ (item) => item.name.toString() }
		renderItem={ ({item}) => <MyItem ingredient={ item }/> }
		onEndReached={ _loadMoreIngredients }
        onEndReachedThreshold={ 0.5 }
      />
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