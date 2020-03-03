import React, { useState } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';

import Error from './Error';
import RecipesList from './RecipesList';
import RecipeItem from './RecipeItem';

const SavedRecipes = ({navigation, savedRecipes}) => {	

	// Gère la navigation
	_navigateToRecipeDetails = ( recipeID ) => {
		navigation.navigate("RecipeDetails", { recipeID });
	}
	
	return (
		<View style = { styles.mainView }>
			<View style = {styles.listLayout}>
				<RecipesList
					recipes = {savedRecipes}
					onClickNavigation = {_navigateToRecipeDetails}
				/>
			</View>
		</View>
	);
}

SavedRecipes.navigationOptions = {
	title: 'SavedRecipes',
};

// Récupère la variable globale state
const mapStateToProps = (state) => {
	return { savedRecipes: state.savedRecipes.savedRecipes }
}

export default connect(mapStateToProps)(SavedRecipes);

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: colors.mainSearchColor,
	},
	loadingView: {
		flex: 1,
	},
	listLayout: {
	},
});