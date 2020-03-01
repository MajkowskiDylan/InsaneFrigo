import React, { useState, useRef, useEffect,  Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, FlatList, navigation, Keyboard } from 'react-native';
import MyItem from './MyItem';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { getIngredients } from '../api/spoonacular';
import { connect, dispatch } from 'react-redux';

const IngredientSearch = (props,state, navigation) => {
	const [filter, setFilter] = useState(0);
	const filters = ['Name', 'Aisle'];
	const [ingredientsData, setIngredientsData] = useState([]); // ce que la flatlist va afficher (API ou liste, selon les cas)
	const [isRefreshing, setRefreshingState] = useState( false );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
	const paginationData = useRef( {currentOffset: 0, maxResults: 0} );
	const searchTerm = useRef("");
	// Les listes, theLists correspond à ce qui sera passé en propriété à la FlatList (ci-dessous) dans le MyItem
	const [theFridge, setTheFridge] = useState([{"name": "Testnom", "aisle": "Testrayon"},{"name": "abcd", "aisle": "rayonabcd"}]);
	const [theShoppingList, setTheShoppingList] = useState([{"name": "abcd", "aisle": "rayonabcd"}]); 
	const theLists = [theFridge, theShoppingList];
	const myOrigin = props.myOrigin; // regarde si le composant IngredientSearch est appelé depuis une page Fridge ou ShoppingList
	var needToAdd = props.addTo; // regarde si le composant IngredientSearch est appelé depuis une page AddTo ou non



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
			// Soit on est dans My Fridge, My Shopping List (affichage liste correspondante) ou AddTo (affichage API)
			if(myOrigin == "Fridge")
			{
				var apiSearchResult = theFridge.filter(element => (element.name).startsWith(searchTerm.current));
			}
			else if (myOrigin == "ShoppingList")
			{
				var apiSearchResult = theShoppingList.filter(element => (element.name).startsWith(searchTerm.current));
			}
			else
			{
				var apiSearchResult = ( await getIngredients( paginationData.current.currentOffset, searchTerm.current, 10 ) );
				
			}
			// Tri selon name ou aisle
			setIngredientsData( [...prevIngredients, ...apiSearchResult].sort((a,b) => {
				if(filter == 1)
				{
					return (a.aisle).localeCompare(b.aisle);
				}
				return (a.name).localeCompare(b.name);
			}));
			//paginationData.current = { currentOffset: paginationData.current.currentOffset + apiSearchResult.number, maxResults: apiSearchResult.totalResults }
		} catch (error) {
			paginationData.current = { currentOffset: 0, maxResults: 0 };
			setIngredientsData( [] );
			setErrorDataLoading( true ); // il faut mettre true
		} finally {
			setRefreshingState( false );
		}
	}

	return (
		<View>
			<View style = { styles.searchView }>
				<TextInput
					placeholder = "Ingredient's name"
					style = { styles.searchField }
					onChangeText={ text => _inputSearchTermChanged(text) }
					onSubmitEditing={ () => { _searchIngredients(); Keyboard.dismiss()} }
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
		renderItem={ ({item}) => <MyItem ingredient={ item } lists={theLists} parent={myOrigin} addTo={needToAdd}/> }
		onEndReached={ _searchMoreIngredients }
        onEndReachedThreshold={ 0.5 }
      />
	 
		</View>
	);

}


export default connect(mapStateToProps)(IngredientSearch);

IngredientSearch.navigationOptions = {
	title: 'I',
};

const mapStateToProps = (state) => {
	return {
	  updateIngredients: state.updateIngredients.tbIngredients
	}
}

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