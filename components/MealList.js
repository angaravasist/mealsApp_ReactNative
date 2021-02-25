import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableNativeFeedback, ImageBackground } from 'react-native';
import defaultFont from '../constants/defaultFonts';
import { useSelector } from 'react-redux';

const MealList = props => {

    let Touchablecmp = TouchableOpacity;
    if (Platform.OS === 'android') {
        Touchablecmp = TouchableNativeFeedback
    }
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.find(meal => meal.id === itemData.item.id)
        return (
            <View style={Styles.mealItem}>
                <Touchablecmp onPress={()=>props.navigation.navigate('MealsDetail', {mealId: itemData.item.id, mealTitle: itemData.item.title, isFav: isFavorite})}>
                    <View>
                        <View style={{ ...Styles.mealRow, ...Styles.mealHeader }}>
                            <ImageBackground source={{ uri: itemData.item.imageUrl }} style={Styles.bgImage}>
                                <View style={Styles.titleContainer}>
                                    <Text style={Styles.title} numberOfLines={1}>{itemData.item.title}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ ...Styles.mealRow, ...Styles.mealDetail }}>
                            <Text style={defaultFont.openSans}>{itemData.item.duration}m</Text>
                            <Text style={defaultFont.openSans}>{itemData.item.complexity.toUpperCase()}</Text>
                            <Text style={defaultFont.openSans}>{itemData.item.affordability.toUpperCase()}</Text>
                        </View>
                    </View>
                </Touchablecmp>
            </View>
        );
    }

    return (
        <View style={Styles.list}>
            <FlatList 
                data={props.listData} 
                style={{ width: '100%' }} 
                keyExtractor={(item, index) => item.id} 
                renderItem={renderMealItem} 
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    mealItem: {
        height: 200,
        width: '100%',
        marginVertical: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    bgImage: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    mealRow: {
        flexDirection: 'row',
    },
    mealHeader: {
        height: '85%',
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    }
});

export default MealList;