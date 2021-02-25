import React, { useEffect, useCallback } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/headerButtons';
import defaultFont from '../constants/defaultFonts';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';
import { elastic } from 'react-native/Libraries/Animated/src/Easing';

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealId)
    );
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite })
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={Styles.image} />
            <View style={Styles.details}>
                <Text style={defaultFont.openSans}>{selectedMeal.duration}m</Text>
                <Text style={defaultFont.openSans}>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text style={defaultFont.openSans}>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={Styles.title}>Ingredients</Text>

            <View style={Styles.ingredientsView}>
                {selectedMeal.ingredients.map((ingredient, index) => (
                    <Text style={{ ...defaultFont.openSans, ...Styles.ingredientsList }} key={(Number(index) + 1).toString()}>
                        {ingredient}
                    </Text>
                ))}
            </View>

            <Text style={Styles.title}>Steps</Text>

            {selectedMeal.steps.map((step, index) => (
                <View key={(Number(index) + 1).toString()} style={Styles.listItem}>
                    <Text style={{ ...defaultFont.openSansBold, ...Styles.stepsIndex }}>Step {index + 1}:</Text>
                    <Text style={Styles.steps}>{step}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

MealDetailsScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    const isFavorite = navigationData.navigation.getParam('isFav')

    return {
        headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Favorite" iconName={isFavorite ? "ios-star" : "ios-star-outline"} onPress={toggleFavorite} />
            </HeaderButtons>
        )
    }
}

const Styles = StyleSheet.create({
    image: {
        height: 200,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        paddingTop: 10,
        // textDecorationLine: 'underline'
    },
    listItem: {
        marginVertical: 5,
        marginHorizontal: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    ingredientsView: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    ingredientsList: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(74, 20, 140, 0.65)',
        color: 'white'
    },
    stepsIndex: {
        textDecorationLine: 'underline',
        fontSize: 20
    },
    steps: {
        fontSize: 18
    }
})

export default MealDetailsScreen;