import React, { useState, useRef, useEffect,  Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, FlatList, navigation, Keyboard } from 'react-native';
import { connect, dispatch } from 'react-redux';
import { CheckBox, Button, ButtonGroup, Input  } from 'react-native-elements'

import MyItem from './MyItem';
import { getIngredients } from '../api/spoonacular';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const IngredientSearch = ({updateIngredients, navigation, dispatch, addTo, myOrigin}) => {
	
	const [filter, setFilter] = useState(0);
	const filters = ['Name', 'Aisle'];
	const [ingredientsData, setIngredientsData] = useState([]); // ce que la flatlist va afficher (API ou liste, selon les cas)
	const [isRefreshing, setRefreshingState] = useState( false );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
	const paginationData = useRef( {currentOffset: 0, maxResults: 0} );
	const searchTerm = useRef("");
	
	//Liste selon que l'on affiche le frigo lou la shopping liste
	listeDispalyItem = null;
	if (myOrigin == "Fridge")
		listeDispalyItem = updateIngredients.FridgeIngredients;
	if (myOrigin == "ShoppingList")
		listeDispalyItem = updateIngredients.ShoppingIngredients;

	//const myOrigin = props.myOrigin; // regarde si le composant IngredientSearch est appelé depuis une page Fridge ou ShoppingList
	var needToAdd = /*props.*/addTo; // regarde si le composant IngredientSearch est appelé depuis une page AddTo ou non
	const descriptionMy = "Here you can  remove ingredients from the " + myOrigin + ", press an empty icon to add it to the other list,a black one means it is already in the other list.";
	const descriptionAddTo = "Here you can add to the " + needToAdd + ". Press an empty icon to add it, a black one means it is already in.";

	useEffect(() => {
		_searchIngredients();
	  }, []);

	// Changement du texte de l'input
	_inputSearchTermChanged = (text) => {
		searchTerm.current = text;
	}

	// Recherche d'un aliment
	_searchIngredients = () => {
		paginationData.current = { currentOffset: 0, maxResults: 0 }
		_loadIngredients([]);
	}

	// Charge des données supplementaires
	_searchMoreIngredients = () => {
		if( paginationData.current.currentOffset < paginationData.current.maxResults ) {
			_loadIngredients(ingredientsData);
		}
	}
	
    _loadIngredients = async (prevIngredients) => {
		setRefreshingState( true );
		setErrorDataLoading( false );
		try {
			if (!addTo)
				var apiSearchResult = listeDispalyItem.filter(element => (element.name).startsWith(searchTerm.current));
			else
				var apiSearchResult = ( await getIngredients( paginationData.current.currentOffset, searchTerm.current, 10 ) );
			
			// Tri selon name ou aisle
			setIngredientsData( [...prevIngredients, ...apiSearchResult].sort((a,b) => {
				if(filter == 1)
				{
					return (a.aisle).localeCompare(b.aisle);
				}
				return (a.name).localeCompare(b.name);
			}));
			console.log('6')

		//paginationData.current = { currentOffset: paginationData.current.currentOffset + apiSearchResult.number, maxResults: apiSearchResult.totalResults }
		} catch (error) {
			console.log("errer" + error)
			paginationData.current = { currentOffset: 0, maxResults: 0 };
			setIngredientsData( [] );
			setErrorDataLoading( true ); // il faut mettre true
		} finally {
			setRefreshingState( false );
		}
	}

	_displayDescription = () => {
		if((needToAdd != "Fridge") && (needToAdd != "ShoppingList"))
		{
			return (
				<Text style = {styles.description}> {descriptionMy} </Text>
			);
		}
		return (
			<Text style = {styles.description}>  {descriptionAddTo} </Text>
		);
	};







	return (
		<View>
			{ _displayDescription() }

			<View style = { styles.searchView }>
				<Input 
					placeholder = "Ingredient's name"
					style = { styles.searchField }
					onChangeText={ text => _inputSearchTermChanged(text) }
					onSubmitEditing={ () => { _searchIngredients(); Keyboard.dismiss()} }
				/>
			</View>
			
			
			<ButtonGroup onPress={filter => setFilter(filter)} selectedIndex={filter} buttons={filters}></ButtonGroup>

			<FlatList
				data={ ingredientsData }
				keyExtractor={ (item) => item.name.toString() }
				renderItem={ ({item}) => <MyItem ingredient={ item } parent={myOrigin} addTo={needToAdd}/> }
				onEndReached={ _searchMoreIngredients }
				onEndReachedThreshold={ 0.5 }
      		/>
	 
		</View>
	);

}

IngredientSearch.navigationOptions = {
	title: 'I',
};

const mapStateToProps = (state) => {
	return {
    updateIngredients: state.updateIngredients,
    config : state.settingPreferance
	}
}

export default connect(mapStateToProps)(IngredientSearch);


const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: colors.mainSearchColor,
	},
	searchView: {
		alignItems: 'stretch',
		flexDirection: 'row',
	},
	searchField: {
		flex: 1,
		height: 20,
		fontSize: 20,
		paddingLeft: 10,
		backgroundColor: colors.mainSilverColor,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 20,
		height: 20,
	},
	searchIcon: {
		width: 20,
		height: 20,
	},
	description: {
		marginLeft : 20,
		marginRight: 10
	}
});