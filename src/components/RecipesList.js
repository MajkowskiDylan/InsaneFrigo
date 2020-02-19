import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import RecipeItem from './RecipeItem';

const RecipesList = ({recipes, refreshingState, onClickNavigation}) => {

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
		/>
	);
}

export default RecipesList;

const styles = StyleSheet.create({
	RecipesList: {
		flex: 1,
	},
});