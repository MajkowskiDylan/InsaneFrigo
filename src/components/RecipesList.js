import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import RecipeItem from './RecipeItem';

const RecipesList = ({recipes, refreshingState, onClickNavigation, refreshRecipes, loadMoreRecipes}) => {

	return (
		<FlatList
			style = { styles.RecipesList }
            data = { recipes }
            keyExtractor = { (item) => item.id.toString() }
            renderItem = { ({item}) => <RecipeItem
                                        recipe = { item }
                                        /**isSaved = { _isItSaved(item.recipe.id) } */
                                        onClickOnMe = { onClickNavigation }
                                    /> }
            refreshing = { refreshingState }
            onRefresh = { refreshRecipes }
            onEndReached = { loadMoreRecipes }
            onEndReachedThreshold = { 0.5 }
		/>
	);
}

export default RecipesList;

const styles = StyleSheet.create({
	RecipesList: {
		flex: 1,
	},
});