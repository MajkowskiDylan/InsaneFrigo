import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const RecipeItem = ( {recipe, isSaved, onClickOnMe} ) => {

    const _displaySaved = () => {
		/*if( isSaved ) {
			return (
				<Image style = { styles.restaurantDataIcons } source = { assets.toUnsaveIcon }/>
			);
		}
		return null;*/
	}

	return (
        <TouchableOpacity style = { styles.mainView } onPress = { onClickOnMe } >
            <Text style = { styles.recipeTitle }> 
                { recipe.title } 
            </Text>
			<Image style = { styles.recipeImage } source = {{ uri: 'https://spoonacular.com/recipeImages/' + recipe.image }}/>
		</TouchableOpacity>
	);
}

export default RecipeItem;

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
    },
    recipeTitle: {

    },
    recipeImage: {
        height: 150,
		backgroundColor: colors.mainGreenColor,
    }
});