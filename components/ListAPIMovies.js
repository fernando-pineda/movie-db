import React, { Component } from 'react';
import { Image, Button } from 'react-native-elements';
import { Text, Share, Dimensions, View, Alert, StyleSheet, FlatList } from 'react-native';
import { fetchMovieHomePage } from '../components/fetchMovies';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Linking from 'expo-linking';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ListAPIMovies = ({ item, showAddMovieModal, showWatchTrailerModal }) => {

    const openIMDBlink = async () => {
        await fetchMovieHomePage(item.key).then(homePage => {

            Linking.openURL(homePage);
        });
    };

    const handleOpenAddMovieModal = (item) => {
        // I had to do this because it was calling the function in an infinite loop lol
        showAddMovieModal(item);
        // console.log(`Sending: ${item.title} through handleOpenModal`)
    };

    const handleShowWatchTrailerModal = (item) => {
        showWatchTrailerModal(item)
    };

    const getStars = () => {
        let stars = [];

        for (let i = 0; i < item.vote_average; ++i) {
            stars.push(i);
        };

        return stars;
    };

    return (
        <View style={styles.betweenElements}>

            <View style={styles.card}>

                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.container}>


                    <View style={styles.posterContainer}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.poster} />

                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText} >RATING:</Text>
                            <Text style={styles.ratingText} >{Math.round(item.vote_average)}/10</Text>

                            <FlatList data={getStars()} style={styles.starContainer} renderItem={() => {
                                return (

                                    <EntypoIcon name="star" size={25} color="#E50914" />

                                )
                            }} />
                        </View>

                        <Collapse>

                            <CollapseHeader>
                                <View style={{ borderRadius: 5, backgroundColor: "white", alignSelf: "center", width: screenWidth / 1.15, height: 35, backgroundColor: "#E50914" }}>

                                    <View style={{ alignSelf: "center", paddingTop: 3, flexDirection: "row" }} >

                                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, textAlign: "center" }}>PRESS TO SEE THE OVERVIEW</Text>

                                    </View>

                                </View>
                            </CollapseHeader>

                            <CollapseBody>

                                <View style={styles.textContainer}>

                                    <Text style={styles.text}>{item.overview}</Text>

                                </View>

                            </CollapseBody>

                        </Collapse>


                    </View>


                    <View style={styles.allButtonsContainer}>


                        <View style={styles.buttonContainer}>
                            <Button
                                icon={<FontAwesome
                                    name="imdb"
                                    size={25}
                                    color="white"
                                />}
                                buttonStyle={styles.button}
                                onPress={() => openIMDBlink()}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                icon={
                                    <EntypoIcon
                                        name="video"
                                        size={25}
                                        color="white"
                                    />}
                                onPress={() => { handleShowWatchTrailerModal(item) }}
                                buttonStyle={styles.button}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                icon={<EntypoIcon
                                    name="add-to-list"
                                    size={25}
                                    color="white"
                                />}
                                buttonStyle={styles.button}
                                onPress={() => handleOpenAddMovieModal(item)}
                            />
                        </View>


                    </View>


                </View>
            </View>
        </View >

        // <View style={styles.container}>
        //     <Card
        //         boderless
        //         title={item.title}
        //         caption={item.overview}
        //         imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
        //         image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        //     >
        //         <Text>Vote: {item.vote_average}</Text>
        //         <Text>Release Date:{item.release_date}</Text>

        //         <AddMovie item={item} showAddMovieModal={showAddMovieModal} showWatchTrailerModal={showWatchTrailerModal} />
        //     </Card>
        // </View>
    );
};

const styles = StyleSheet.create({

    betweenElements: {
        paddingTop: 10,
    },

    card: {
        borderWidth: .5,
        borderRadius: 10,
        paddingRight: 5,
        backgroundColor: "#011627",
    },

    title: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        color: "white",
        textTransform: "uppercase",
        textAlign: "center"
    },

    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignSelf: "center"
    },

    posterContainer: {
        flex: 1,
        paddingTop: 5,
        alignSelf: "center",
        alignContent: "center",

    },

    poster: {
        resizeMode: "contain",
        aspectRatio: 1.2,
        borderRadius: 5
    },

    ratingContainer: {
        paddingTop: 10,
        paddingBottom: 10
    },

    starContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "center",
        paddingTop: 5
    },

    textContainer: {
        flex: 1,
        alignSelf: "center",
        paddingTop: 15
    },

    text: {
        textAlign: "justify",
        fontSize: 15,
        alignSelf: "center",
        color: "white"
    },

    ratingText: {
        fontSize: 20,
        fontWeight: "500",
        alignSelf: "center",
        color: "white",
    },


    allButtonsContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        alignSelf: "center",

    },

    buttonContainer: {
        padding: 5
    },

    button: {
        backgroundColor: "#E50914",
        width: 100,
        height: 30,
    },


});

export default ListAPIMovies;