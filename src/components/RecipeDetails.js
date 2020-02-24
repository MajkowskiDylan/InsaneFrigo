import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

import { getRecipeDetails } from '../api/spoonacular';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const RecipeDetails = ({navigation}) => {
    
	const [isLoading, setLoadingState] = useState( true );
    const [recipe, setRecipe] = useState( null );

    useEffect(() => {
		_loadRecipe();
	}, []);
    
    // Charge les informations sur la recette selon son ID
	_loadRecipe = async () => {
		try {
			setRecipe( await getRecipeDetails(navigation.getParam('recipeID')) );
			setLoadingState( false );
		} catch (error) {
			// Do 
		}
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
		return null; // Si on souhaite ne rien afficher (pas obligatoire)
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
						style = { styles.dietItem }
						data = { recipe.diets }
						keyExtractor = { (item) => item.toString() }
						renderItem = { ({item}) => <Text>{item}</Text> }
					/>
					<FlatList
						style = { styles.cuisineItem }
						data = { recipe.diets }
						keyExtractor = { (item) => item.toString() }
						renderItem = { ({item}) => <Text>{item}</Text> }
					/>
				</ScrollView>
			);
		}
		return null;
	}
	
	const _displaySaved = () => { return null }

	return (
		<View style = {styles.mainView}>
			{ _displayLoading() }
			{ _displayRecipeDetails() }
		</View>
	);
}

/*export default connect(mapStateToProps)(RecipeDetails);*/
export default RecipeDetails;

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
	dietItem:{
		padding: 3,
		backgroundColor: colors.mainGreenColor,
	},
	cuisineItem: {
		padding: 3,
		backgroundColor: colors.mainBlueColor,
	}
});