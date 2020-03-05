import React, { useState } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';

import RecipeItem from './RecipeItem';

const SavedRecipes = ({navigation, savedRecipes}) => {	

	// Gère la navigation
	_navigateToRecipeDetails = ( recipeID ) => {
		navigation.navigate("RecipeDetails", { recipeID });
	}
	
	return (
		<View style = { styles.mainView }>
			<View style = {styles.listLayout}>
				<FlatList
					style = { styles.RecipesList }
					data = { savedRecipes }
					keyExtractor = { (item) => item.id.toString() }
					extraData = { savedRecipes }
					renderItem = { ({item}) => <RecipeItem
												recipe = { item }
												isSaved = { true }
												onClickOnMe = { _navigateToRecipeDetails }
											/> }
				/>
			</View>
		</View>
	);
}

SavedRecipes.navigationOptions = {
	title: 'My Recipes',
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
		flex: 1,
	},
});