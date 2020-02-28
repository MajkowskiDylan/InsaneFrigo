import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

import Error from './Error';
import { getRecipeDetails } from '../api/spoonacular';
import IngredientItem from './IngredientItem';

const RecipeDetails = ({navigation, savedRecipes, dispatch}) => {

	const [recipe, setRecipe] = useState( null );
	const [isLoading, setLoadingState] = useState( true );
	const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );

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

	_saveRecipe = async () => {
		const action = { type: 'SAVE_RECIPE', value: navigation.getParam('recipeID') };
		dispatch(action);
	}

	_unsaveRecipe = async () => {
		const action = { type: 'UNSAVE_RECIPE', value: navigation.getParam('recipeID') };
		dispatch(action);
	}

    // Chargement des données
    _displayLoading = () => {
        if (isLoading) {
			return (
				<View style = {styles.loadingView}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
		return null;
    }

    // Détails d'une recette
    _displayRecipeDetails = () => {
		if (recipe) {
			return (
				<ScrollView style = {styles.mainView}>
					<View style = {styles.viewTop}>
						<Image style = { styles.recipeImage } source = {{ uri: recipe.image }}/>
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
						<Text style = {styles.title}>Ingrédients</Text>
						<FlatList
							style = { styles.ingredientsList }
							data = { recipe.extendedIngredients }
							keyExtractor = { (item) => item.id.toString() }
							renderItem = { ({item}) => <IngredientItem original = {item.original} image = {item.image} instructions = {item.instructions} />}
						/>
					</View>
					<View style = {styles.instructions}>
						<Text style = {styles.title}>Préparation</Text>
						{console.log(navigation.getParam('recipeID'))}
						<FlatList
							style = { styles.instructionsList }
							data = { recipe.analyzedInstructions[0].steps }
							keyExtractor = { (item) => item.number.toString() }
							renderItem = {({item}) => <Text style = {styles.step}> <Text style = {styles.li}>{item.number}</Text> {item.step} </Text>}
							
						/>
					</View>
				</ScrollView>
			);
		}
		return null;
	}
	
	const _displaySaved = () => { 
		if (savedRecipes.findIndex((e) => e === navigation.getParam('recipeID')) != -1)
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

// Récupère la variable globale state
const mapStateToProps = (state) => {
	return { savedRecipes: state.savedRecipes.savedRecipeIDs }
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
        top: 160,
        left: 10,
        fontSize: 28,
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
        paddingLeft: 200,
        flexDirection: 'row',
    },
    bottomIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    saveIcon: {
        width: 25,
        height: 25,
        tintColor: colors.mainOrangeColor,
    },
    span: {
        fontSize: 20,
        fontWeight: "bold",
	},
	tagList: {
		flexDirection: "row",
	},
	dietItem:{
		margin: 3,
		padding: 3,
		padding: 5,
		paddingTop: 3,
		borderRadius: 5,
		color: colors.mainWhiteColor,
		backgroundColor: colors.mainGreenColor,
	},
	cuisineItem: {
		margin: 3,
		padding: 3,
		padding: 5,
		paddingTop: 3,
		borderRadius: 5,
		color: colors.mainWhiteColor,
		backgroundColor: colors.mainBlueColor,
	},
	ingredients: {
		padding: 10,
		marginTop: 50,
	},
	ingredientsList: {
		textAlign: "justify",
	},
	instructions: {
		padding: 10,
		marginTop: 50,
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
	}
});