import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const RecipeItem = ({recipe, isSaved, onClickOnMe}) => {

    const _displaySaved = () => {
		if( isSaved ) { return ( <Image  style = { styles.saveIcon } source = { assets.toUnsaveIcon } /> ); }
		return ( <Image  style = { styles.saveIcon } source = { assets.toSaveIcon } /> );
	}

	return (
        <TouchableOpacity style = { styles.mainView } onPress={ () => onClickOnMe(recipe.id) } >
            <View style = {styles.viewTop}>
                <View style = {styles.hr}></View>
                <Image style = { styles.recipeImage } source = {{ uri: 'https://spoonacular.com/recipeImages/' + recipe.image }}/>
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
		</TouchableOpacity>
	);
}

export default RecipeItem;

const styles = StyleSheet.create({
	mainView: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        backgroundColor: colors.mainWhiteColor,
    },
    viewTop: {
        
    },
    recipeTitle: {
        top: 110,
        left: 10,
        fontSize: 28,
        position: "absolute",
        fontWeight: "bold",
        color: colors.mainWhiteColor,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    recipeImage: {
        height: 150,
		backgroundColor: colors.mainGreenColor,
    },
    hr: {
        height: 5,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
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
    }
});