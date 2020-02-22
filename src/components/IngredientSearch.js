import React, { useState, useRef,  Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, FlatList, navigation, Keyboard } from 'react-native';
import MyItem from './MyItem';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { getIngredients } from '../api/spoonacular';
import { connect, dispatch } from 'react-redux';

const IngredientSearch = ({props, ingredientsName,saveIngredients, savedIngredients, dispatch}) => {
	const [filter, setFilter] = useState(0);
	const filters = ['Name', 'Aisle'];
	const [ingredientsData, setIngredientsData] = useState([]);
	const [isRefreshing, setRefreshingState] = useState( false );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
	const paginationData = useRef( {currentOffset: 0, maxResults: 0} );
	const searchTerm = useRef("");

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
			var apiSearchResult = ( await getIngredients( paginationData.current.currentOffset, searchTerm.current, 3 ) );
			A = [{"name": "Aomate", "aisle": "Bilboquet"}];
			B = [{"name": "Baricot", "aisle": "Legume"}];
			C = [{"name": "Caerfqsot", "aisle": "Volcan"}];
			D = [{"name": "Domme", "aisle": "Fruit"}];
			E = [{"name": "Aoqsdlm", "aisle": "Legume"}];
			F = [{"name": "Kkkk", "aisle": "Fruit"}];
			G = [{"name": "Jjjjj", "aisle": "Legume"}];
			H = [{"name": "Iiii", "aisle": "Fruit"}];
			//var apiSearchResult = [...D,...A, ...B, ...C, ...E, ...F, ...G, ...H];
			console.log(apiSearchResult);
			setIngredientsData( [...prevIngredients, ...apiSearchResult].sort((a,b) => {
				if(filter == 1)
				{
					return (a.aisle).localeCompare(b.aisle);
				}
				return (a.name).localeCompare(b.name);
			}));
			paginationData.current = { currentOffset: paginationData.current.currentOffset + apiSearchResult.number, maxResults: apiSearchResult.totalResults }
			
		} catch (error) {
			paginationData.current = { currentOffset: 0, maxResults: 0 };
			setIngredientsData( [] );
			setErrorDataLoading( false ); // il faut mettre true
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
					onSubmitEditing={ () => {_searchIngredients(); Keyboard.dismiss()} }
				/>
				<TouchableHighlight onPress={ _searchIngredients }>
					<View style = { styles.button }>
						<Image  style = { styles.searchIcon } source = { assets.searchIcon }/>
					</View>
				</TouchableHighlight>
			</View>
			<ButtonGroup onPress={filter => setFilter(filter)} selectedIndex={filter} buttons={filters}></ButtonGroup>
			{ isErrorDuringDataLoading ? // Si il y'a une erreur, afficher le component Error
			( 
				<Error msgError = 'Impossible de charger le contenu de la page.'/> 
			)
			: (	
			<FlatList
        data={ ingredientsData }
		keyExtractor={ (item) => item.name.toString() }
		renderItem={ ({item}) => <MyItem ingredient={ item }/> }
		onEndReached={ _searchMoreIngredients }
        onEndReachedThreshold={ 0.5 }
      />
	  )}
		</View>
	);

}


export default IngredientSearch;
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