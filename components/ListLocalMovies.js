import React, { Component } from 'react';
import { Text, Share, Dimensions, View, Alert, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteMovie } from '../library/storage/StorageFunctions';
import { fetchMovieHomePage } from '../components/fetchMovies';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ListLocalMovies = ({ item, refreshRender, showEditMovieModal }) => {

    if (item.userReview == undefined) {
        item.userReview = "I didn't write a review :("
    };

    const handleRemoveMovie = () => {
        Alert.alert('Hey!', `Do you really want to remove ${item.title} from your library?`, [
            { text: 'NO' },
            {
                text: "DO IT!", onPress: () => {
                    deleteMovie(item)
                    setTimeout(refreshRender, 250)

                }
            }
        ],
            { cancelable: true });
    }

    const handleOpenEditMovieModal = (item) => {
        // I had to do this because it was calling the function in an infinite loop lol
        showEditMovieModal(item);
        // console.log(`Sending: ${item.title} through handleOpenModal`)
    };

    const shareMovie = async () => {

        await fetchMovieHomePage(item.key).then(homePage => {
            const shareOptions = {
                title: 'I want to share something special with you!',
                message: `Hey! I already watched ${item.title} 
🤓 My Review: "${item.userReview}".
⭐ My Rate: ${item.userRate} / 10 

🎬 See More at: 
${homePage}

Download Movienator: 
playstore_link`,

                // Note that according to the documentation at least one of "message" or "url" fields is required
                url: '',
                // url: fileLocation

            };

            Share.share(shareOptions)
        })

    };
    const getStars = () => {
        let stars = [];

        for (let i = 0; i < item.userRate; ++i) {
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
                            <Text style={styles.ratingText} >YOUR RATING:</Text>

                            <FlatList data={getStars()} style={styles.starContainer} renderItem={() => {
                                return (

                                    <Icon name="star" size={25} color="#E50914" />

                                )
                            }} />
                        </View>

                        <Collapse>

                            <CollapseHeader>
                                <View style={{ borderRadius: 5, backgroundColor: "white", alignSelf: "center", width: screenWidth / 1.15, height: 35, backgroundColor: "#E50914" }}>

                                    <View style={{ alignSelf: "center", paddingTop: 3, flexDirection: "row" }} >
                                        {/* 
                                        <Icon name="pencil" size={25} color="white" /> */}

                                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, textAlign: "center" }}>PRESS TO SEE YOUR REVIEW</Text>


                                    </View>

                                </View>
                            </CollapseHeader>

                            <CollapseBody>

                                <View style={styles.textContainer}>

                                    <Text style={styles.text}>{item.userReview}</Text>

                                </View>

                            </CollapseBody>

                        </Collapse>


                    </View>


                    <View style={styles.allButtonsContainer}>


                        <View style={styles.buttonContainer}>
                            <Button
                                icon={<Icon
                                    name="edit"
                                    size={25}
                                    color="white"
                                />}
                                buttonStyle={styles.button}
                                onPress={() => handleOpenEditMovieModal(item)}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                icon={
                                    <Icon
                                        name="trash"
                                        size={25}
                                        color="white"
                                    />}
                                onPress={() => { handleRemoveMovie() }}
                                buttonStyle={styles.button}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                icon={<Icon
                                    name="share-square"
                                    size={25}
                                    color="white"
                                />}
                                buttonStyle={styles.button}
                                onPress={() => shareMovie(item)}
                            />
                        </View>


                    </View>


                </View>
            </View>
        </View>


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
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        color: "white",
        textTransform: "uppercase"
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


export default ListLocalMovies;