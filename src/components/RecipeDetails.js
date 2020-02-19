import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

import { getRecipeDetails } from '../api/spoonacular';

const RecipeDetails = ({navigation}) => {
    
	const [isLoading, setLoadingState] = useState( true );
    const [recipeData, setRecipeData] = useState( null );

    useEffect(() => {
		_loadRestaurant();
	}, []);
    
    // Charge les informations sur la recette selon son ID
	_loadRestaurant = async () => {
		try {
			setRecipeData( await getRecipeDetails(navigation.getParam('recipeID')) );
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
		if (recipeData) {
			return (
				<ScrollView style = { styles.mainView }>
					Ok ?
				</ScrollView>
			);
		}
		return null;
    }

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

});