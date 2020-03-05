import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import RecipeItem from './RecipeItem';

const RecipesList = ({recipes, refreshingState, onClickNavigation, refreshRecipes, loadMoreRecipes, notFirstSearch, savedRecipes}) => {

    // Retourne vrai si une des recettes chargées est enregistrée
    const _isItSaved = ( recipeID ) => {
		return (savedRecipes.findIndex((e) => e.id === recipeID) != -1)
	}
    
	return (
        notFirstSearch && recipes.length == 0 ? // Si une recherche a déjà était faite et qu'aucun résultat n'est trouvé
        ( 
            <Text>No results were found for your search.</Text>
        ): 
        (
            <FlatList
                style = { styles.RecipesList }
                data = { recipes }
                keyExtractor = { (item) => item.id.toString() }
                extraData = { savedRecipes }
                renderItem = { ({item}) => <RecipeItem
                                            recipe = { item }
                                            isSaved = { _isItSaved(item.id) }
                                            onClickOnMe = { onClickNavigation }
                                        /> }
                refreshing = { refreshingState }
                onRefresh = { refreshRecipes }
                onEndReached = { loadMoreRecipes }
                onEndReachedThreshold = { 0.5 }
            />
		)  
	);
}

// Récupère la variable globale state
const mapStateToProps = (state) => {
	return { savedRecipes: state.savedRecipes.savedRecipes }
}

export default connect(mapStateToProps)(RecipesList);

const styles = StyleSheet.create({
	RecipesList: {
		flex: 1,
	},
});