import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Picker } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

import Error from './Error';
import RecipesList from './RecipesList';

import { getRecipeWithSearch, getPossibleRecipe } from '../api/spoonacular';

const Search = ({navigation, savedIngredients}) => {
	
	const [notFirstSearch, setNotFirstSearch] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [dietValue, setDietValue] = useState("");
	const [cuisineValue, setCuisineValue] = useState("");
	const [recipes, setRecipes] = useState([]);
	const [isRefreshing, setRefreshingState] = useState( false );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
	const paginationData = useRef( {currentOffset: 0, maxResults: 0} );
	
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
			var apiSearchResult = ( await getRecipeWithSearch( paginationData.current.currentOffset, searchTerm, dietValue, cuisineValue ) );
			paginationData.current = { currentOffset: paginationData.current.currentOffset + apiSearchResult.number, maxResults: apiSearchResult.totalResults }
			setRecipes( [...prevRecipes, ...apiSearchResult.results] );
		} catch (error) {
			paginationData.current = { currentOffset: 0, maxResults: 0 };
			setRecipes( [] );
			setErrorDataLoading( true );
		} finally {
			setRefreshingState( false );
			setNotFirstSearch(true);
		}
	}

	// Charge les recettes possibles avec nos ingrédients
	_searchRecipesIcanCook = async () => {
		setRefreshingState( true );
		setErrorDataLoading( false );
		try {
			var ingredients = '';
			savedIngredients.forEach((i) => ingredients += i.name + ', +')
			console.log('ingredients : ' + ingredients)
			var apiSearchResult = ( await getPossibleRecipe( ingredients ) );
			setRecipes( apiSearchResult );
		} catch (error) {
			paginationData.current = { currentOffset: 0, maxResults: 0 };
			setRecipes( [] );
			setErrorDataLoading( true );
		} finally {
			setRefreshingState( false );
			setNotFirstSearch(true);
		}
	}
	
	// Gère la navigation
	_navigateToRecipeDetails = ( recipeID ) => {
		navigation.navigate("RecipeDetails", { recipeID });
	}

	return (
		<View style = { styles.mainView }>
			<View style = {styles.searchLayout}>
				<View style = { styles.searchView }>
					<TextInput
						placeholder = 'Aliments...'
						style = { styles.searchField }
						onChangeText = { text => setSearchTerm(text) }
						onSubmitEditing = { _searchRecipes }
					/>
					<TouchableHighlight onPress = { _searchRecipes }>
						<View style = { styles.button }>
							<Image style = { styles.searchIcon } source = { assets.searchIcon } />
						</View>
					</TouchableHighlight>
				</View>
				<View style = {styles.lists}>
					<Picker
							prompt = "Diet"
							selectedValue = {dietValue}
							style = {styles.list}
							onValueChange = {(itemValue, itemPostion) =>  setDietValue(itemValue)}>
						<Picker.Item label = "Diet" value = "" />
						<Picker.Item label = "Gluten Free" value = "Gluten Free" />
						<Picker.Item label = "Ketogenic" value = "Ketogenic" />
						<Picker.Item label = "Vegetarian" value = "Vegetarian" />
						<Picker.Item label = "Lacto-Vegetarian" value = "Lacto-Vegetarian" />
						<Picker.Item label = "Ovo-Vegetarian" value = "Ovo-Vegetarian" />
						<Picker.Item label = "Vegan" value = "Vegan" />
						<Picker.Item label = "Pescetarian" value = "Pescetarian" />
						<Picker.Item label = "Paleo" value = "Paleo" />
						<Picker.Item label = "Primal" value = "Primal" />
						<Picker.Item label = "Whole30" value = "Whole30" />
					</Picker>
					<Picker
							prompt = "Cuisine"
							selectedValue = {cuisineValue}
							style = {styles.list}
							onValueChange = {(itemValue, itemIndex) => setCuisineValue(itemValue)}>
						<Picker.Item label = "Cuisine" value = "" />
						<Picker.Item label = "African" value = "African" />
						<Picker.Item label = "American" value = "American" />
						<Picker.Item label = "British" value = "British" />
						<Picker.Item label = "Cajun" value = "Cajun" />
						<Picker.Item label = "Caribbean" value = "Caribbean" />
						<Picker.Item label = "Chinese" value = "Chinese" />
						<Picker.Item label = "Eastern European" value = "Eastern European" />
						<Picker.Item label = "European" value = "European" />
						<Picker.Item label = "French" value = "French" />
						<Picker.Item label = "German" value = "German" />
						<Picker.Item label = "Greek" value = "Greek" />
						<Picker.Item label = "Indian" value = "Indian" />
						<Picker.Item label = "Irish" value = "Irish" />
						<Picker.Item label = "Italian" value = "Italian" />
						<Picker.Item label = "Jewish" value = "Jewish" />
						<Picker.Item label = "Korean" value = "Korean" />
						<Picker.Item label = "Latin American" value = "Latin American" />
						<Picker.Item label = "Mediterranean" value = "Mediterranean" />
						<Picker.Item label = "WhoMexicanle30" value = "Mexican" />
						<Picker.Item label = "Middle Eastern" value = "Middle Eastern" />
						<Picker.Item label = "WhNordicole30" value = "Nordic" />
						<Picker.Item label = "Southern" value = "Southern" />
						<Picker.Item label = "Spanish" value = "Spanish" />
						<Picker.Item label = "Thai" value = "Thai" />
						<Picker.Item label = "Vietnamese" value = "Vietnamese" />
					</Picker>
				</View>
				<View stye = {flex = 1}>
					<TouchableHighlight onPress = {_searchRecipesIcanCook}>
						<Text style = {styles.canCookTodayBtn}>What can I cook today ?</Text>
					</TouchableHighlight>
				</View>
			</View>
			<View style = {styles.resultLayout}>
				{ isErrorDuringDataLoading ? // Si il y'a une erreur, afficher le component Error
				( 
					<Error msgError = 'Unable to load page content.'/> 
				): 
				(
					<RecipesList
						recipes = {recipes}
						refreshingState = {isRefreshing}
						onClickNavigation = {_navigateToRecipeDetails}
						refreshRecipes = {_searchRecipes}
						loadMoreRecipes = {_searchMoreRecipes}
						notFirstSearch = {notFirstSearch}
					/>
				)}
			</View>
		</View>
	);
}

Search.navigationOptions = {
	title: 'Search',
};

// Récupère la variable globale state
const mapStateToProps = (state) => {
	return { savedIngredients: state.updateIngredients.FridgeIngredients }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: colors.mainSearchColor,
	},
	searchLayout: {
		flex: 2,
		flexDirection: "column",
	},
	searchView: {
		height: 50,
		alignItems: 'stretch',
		flexDirection: 'row',
	},
	searchField: {
		flex: 1,
		fontSize: 20,
		paddingLeft: 10,
		backgroundColor: colors.mainSilverColor,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
	},
	searchIcon: {
		width: 40,
		height: 40,
	},
	lists: {
		flexDirection: 'row',
	},
	list: {
		flex: 1,
		margin: 10,
		backgroundColor: colors.mainSilverColor,
	},
	canCookTodayBtn: {
		backgroundColor: colors.mainOrangeColor,
		color: colors.mainWhiteColor,
		marginHorizontal: 10,
		textAlign: 'center',
		padding: 10,
	},
	resultLayout: {
		flex: 5,
	},
});