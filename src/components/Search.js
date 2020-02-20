import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image } from 'react-native';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

import Error from './Error';
import RecipesList from './RecipesList';

import { getRecipeWithSearch } from '../api/spoonacular';

const Search = ({navigation}) => {
	const searchTerm = useRef("");
	const [recipes, setRecipes] = useState([]);
	const [isRefreshing, setRefreshingState] = useState( false );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
	const paginationData = useRef( {currentOffset: 0, maxResults: 0} );
	
	// Changement du texte de l'input
	_inputSearchTermChanged = (text) => {
		searchTerm.current = text;
	}

	// Recherche d'un aliment
	_searchRecipes = () => {
		paginationData.current = { currentOffset: 0, maxResults: 0 }
		_loadRecipes([]);
	}

	// Charge des données supplementaires
	_searchMoreRecipes = () => {
		if( paginationData.current.currentOffset < paginationData.current.maxResults ) {
			_loadRecipes(recipes);
		}
	}

	// Charge les données retournées par l'API
	_loadRecipes = async (prevRecipes) => {
		setRefreshingState( true );
		setErrorDataLoading( false );
		try {
			var apiSearchResult = ( await getRecipeWithSearch( paginationData.current.currentOffset, searchTerm.current /* FAUT AJOUTER D'AUTRES TRUCS ICI */ ) );
			paginationData.current = { currentOffset: paginationData.current.currentOffset + apiSearchResult.number, maxResults: apiSearchResult.totalResults }
			setRecipes( [...prevRecipes, ...apiSearchResult.results] );
		} catch (error) {
			paginationData.current = { currentOffset: 0, maxResults: 0 };
			setRecipes( [] );
			setErrorDataLoading( true );
		} finally {
			setRefreshingState( false );
		}
	}

	// Gère la navigation
	_navigateToRecipeDetails = ( recipeID ) => {
		navigation.navigate("RecipeDetails", { recipeID });
	}

	return (
		<View style = { styles.mainView }>
			<View style = { styles.searchView }>
				<TextInput
					placeholder = 'Aliments...'
					style = { styles.searchField }
					onChangeText = { text => _inputSearchTermChanged(text) }
					onSubmitEditing = { _searchRecipes }
				/>
				<TouchableHighlight onPress = { _searchRecipes }>
					<View style = { styles.button }>
						<Image  style = { styles.searchIcon } source = { assets.searchIcon } />
					</View>
				</TouchableHighlight>
			</View>
			{ isErrorDuringDataLoading ? // Si il y'a une erreur, afficher le component Error
			( 
				<Error msgError = 'Impossible de charger le contenu de la page.'/> 
			)
			: (		
				<RecipesList
					recipes = { recipes }
					refreshingState = { isRefreshing }
					onClickNavigation = { _navigateToRecipeDetails }
					refreshRecipes = { _searchRecipes }
					loadMoreRecipes = { _searchMoreRecipes }
				/>
			)}
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