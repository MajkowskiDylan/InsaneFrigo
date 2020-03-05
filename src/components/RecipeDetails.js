import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

import Error from './Error';
import IngredientItem from './IngredientItem';
import { getRecipeDetails } from '../api/spoonacular';

const RecipeDetails = ({navigation, savedRecipes, savedIngredients, dispatch}) => {

	const [recipe, setRecipe] = useState( null );
	const [isLoading, setLoadingState] = useState( true );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
	var missingIngredients = [];

    useEffect(() => {
		_loadRecipe();
	}, []);
    
    // Charge les informations sur la recette selon son ID
	_loadRecipe = async () => {
		setErrorDataLoading(false);
		try {
			setRecipe( await getRecipeDetails(navigation.getParam('recipeID')) );
			setLoadingState( false );
		} catch (error) {
			setErrorDataLoading(true);
		}
	}

	// Vérifie si un ingrédient est présent dans le frigo
	const _isItSaved = ( ingredientID ) => {
		return (savedIngredients.findIndex((e) => e.id === ingredientID) != -1)
	}

	// Enregistrement d'une recette
	_saveRecipe = async () => {
		const action = { type: 'SAVE_RECIPE', value: recipe };
		dispatch(action);
	}

	// Suppression d'une recette
	_unsaveRecipe = async () => {
		const action = { type: 'UNSAVE_RECIPE', value: recipe };
		dispatch(action);
	}

    // Chargement des données
    _displayLoading = () => {
        if (isLoading) {
			return (
				<View style = {styles.loadingView}>
					<ActivityIndicator size = "large" />
				</View>
			);
		}
		return null;
	}
	
	// Permet d'afficher les ingrédients contenu dans le frigo et de garder dans un tableau les ingrédients manquants 
	_getIngredient = (item, missing) => {
		if(!missing && _isItSaved(item.id)) return ( <IngredientItem original = {item.original} image = {item.image} instructions = {item.instructions} /> );
		else if(missing && !_isItSaved(item.id)) return ( <IngredientItem original = {item.original} image = {item.image} instructions = {item.instructions} /> );
	}

    // Détails d'une recette
    _displayRecipeDetails = () => {
		if (recipe) {
			return (
				<ScrollView style = {styles.mainView}>
					<View style = {styles.viewTop}>
						<Image style = { styles.recipeImage } source = {{ uri: recipe.image }}/>
						<Image style = { styles.filter } source = { assets.filter } />
						<Text style = { styles.recipeTitle }> 
							{ recipe.title }
						</Text>
					</View>
					<View style = {styles.viewBottom}>
						<View style = {styles.box}>
							<Image  style = { styles.bottomIcon } source = { assets.userIcon } />
							<Text style = {styles.span} > { recipe.servings } per. </Text>
						</View>
						<View style = {styles.box}>
							<Image  style = { styles.bottomIcon } source = { assets.timeIcon } />
							<Text style = {styles.span} > { recipe.readyInMinutes } min. </Text>
						</View>
						<View style = {styles.boxSave}>
							{ _displaySaved() }
						</View>
					</View>
					<FlatList
						style = { styles.tagList }
						data = { recipe.diets }
						keyExtractor = { (item) => item.toString() }
						renderItem = { ({item}) => <Text style = {styles.dietItem}>{item}</Text> }
						horizontal
					/>
					<FlatList
						style = { styles.tagList }
						data = { recipe.cuisines }
						keyExtractor = { (item) => item.toString() }
						renderItem = { ({item}) => <Text style = {styles.cuisineItem}>{item}</Text> }
						horizontal
					/>
					<View style = {styles.ingredients}>
						<Text style = {styles.title}>Ingredients</Text>

						<Text style = {styles.subTitle}>In my fridge</Text>
						<FlatList
							style = { styles.ingredientsList }
							data = { recipe.extendedIngredients }
							keyExtractor = { (item) => item.id.toString() }
							renderItem = { ({item}) => _getIngredient(item, false)}
						/>

						<Text style = {styles.subTitle}>Missing</Text>
						<FlatList
							style = { styles.ingredientsList }
							data = { recipe.extendedIngredients }
							keyExtractor = { (item) => item.id.toString() }
							renderItem = { ({item}) => _getIngredient(item, true)}
						/>
					</View>
					
					{
						recipe.analyzedInstructions.length > 0 ? (
						<View style = {styles.instructions}>
							<Text style = {styles.title}>instructions</Text>
							<FlatList
								style = { styles.instructionsList }
								data = { recipe.analyzedInstructions[0].steps }
								keyExtractor = { (item) => item.number.toString() }
								renderItem = {({item}) => <Text style = {styles.step}> <Text style = {styles.li}>{item.number}</Text> {item.step} </Text>}
							/>
						</View> ) : (null)
					}

					{
						recipe.winePairing.pairedWines != null &&  recipe.winePairing.pairedWines.length > 0 ? (
							<View style = {styles.wine}>
								<Text style = {styles.title}>Wine</Text>
								<FlatList
									style = { styles.tagList }
									data = { recipe.winePairing.pairedWines }
									keyExtractor = { (item) => item.toString() }
									renderItem = { ({item}) => <Text style = {styles.wineItem}>{item}</Text> }
									horizontal
								/>
								<Text style = {styles.pairingText}> {recipe.winePairing.pairingText} </Text>
							</View>
						) : (null)
					}
				</ScrollView>
			);
		}
		return null;
	}
	
	// Bouton de sauvegarde
	const _displaySaved = () => { 
		if (savedRecipes.findIndex((e) => e.id === navigation.getParam('recipeID')) != -1)
			return (
				<TouchableOpacity onPress = { _unsaveRecipe }>
					<Image style = { styles.saveIcon } source = { assets.toUnsaveIcon } />
				</TouchableOpacity>
			)
		return (
			<TouchableOpacity onPress = { _saveRecipe }>
				<Image  style = { styles.saveIcon } source = { assets.toSaveIcon } />
			</TouchableOpacity>
		)
	}

	return (
		<View style = {styles.mainView}>
			{ isErrorDuringDataLoading ? // Si il y'a une erreur, afficher le component Error
			( 
				<Error msgError = 'Unable to load page content.'/> 
			)
			: (	
				_displayLoading(),
				_displayRecipeDetails()
			)}
		</View>
	);
}

RecipeDetails.navigationOptions = {
	title: 'Recipe details',
};

// Récupère la variable globale state
const mapStateToProps = (state) => {
	return { savedRecipes: state.savedRecipes.savedRecipes, savedIngredients: state.updateIngredients.FridgeIngredients }
}

export default connect(mapStateToProps)(RecipeDetails);

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
    },
    loadingView: {
		flex : 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewTop: {
        
    },
    recipeTitle: {
        top: 140,
        left: 10,
        fontSize: 20,
        position: "absolute",
        fontWeight: "bold",
        color: colors.mainWhiteColor,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    recipeImage: {
        height: 200,
		backgroundColor: colors.mainGreenColor,
	},
    filter: {
        height: 200,
        position: "absolute",
    },
    viewBottom: {
        height: 60,
        flexDirection: 'row',
        alignContent: "stretch",
    },
    box: {
        flex: 1,
        fontSize: 20,
        paddingTop: 15,
        paddingLeft: 20,
        flexDirection: 'row',
    },
    boxSave: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 120,
        flexDirection: 'row',
    },
    bottomIcon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    saveIcon: {
        width: 25,
        height: 25,
        tintColor: colors.mainOrangeColor,
    },
    span: {
        fontSize: 14,
        fontWeight: "bold",
	},
	tagList: {
		marginLeft: 5,
		flexDirection: "row",
	},
	dietItem:{
		fontSize: 12,
		margin: 2,
		padding: 3,
		padding: 5,
		color: colors.mainWhiteColor,
		backgroundColor: colors.mainBlueColor,
	},
	cuisineItem: {
		fontSize: 12,
		margin: 2,
		padding: 3,
		padding: 5,
		color: colors.mainWhiteColor,
		backgroundColor: colors.mainGrayColor,
	},
	ingredients: {
		padding: 10,
		marginTop: 25,
	},
	ingredientsList: {
		textAlign: "justify",
	},
	instructions: {
		padding: 10,
		marginTop: 25,
	},
	instructionsList: {
		textAlign: "justify",
	},
	li: {
		color: colors.mainGreenColor,
		fontWeight: "bold",
		marginHorizontal: 5,
	},
	step: {
		marginLeft: 5,
		marginTop: 8,
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 15,
	},
	subTitle: {
		fontWeight: "bold",
		fontSize: 17,
		marginBottom: 5,
	},
	wine:{
		padding: 10,
		marginTop: 25,
	},
	wineItem: {
		fontSize: 12,
		margin: 2,
		padding: 3,
		padding: 5,
		color: colors.mainWhiteColor,
		backgroundColor: colors.mainWineColor,
	}, 
	pairingText: {
		marginTop: 8,
		marginLeft: 10,
	}
});