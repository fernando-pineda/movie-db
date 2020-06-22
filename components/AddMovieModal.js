import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { saveMovie } from '../library/storage/StorageFunctions';
import { Image, Input, Button } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';

const AddMovieModal = ({ showAddMovieModalvalue, hideMovieModal, itemData }) => {

    let userReview, userRate;

    const changesNotSaved = () => {
        if (userReview !== undefined || userRate !== undefined) {
            Alert.alert(
                'HEY!',
                `Your changes won't be saved!`,
                [
                    {
                        text: 'EXIT',
                        onPress: () => hideMovieModal(),
                        style: 'cancel'
                    },
                    { text: 'STAY', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        } else {
            hideMovieModal();
        }
    }

    const handleSaveMovie = () => {

        hideMovieModal();
        if (userRate == undefined) {
            userRate = 10;
        }
        // console.log(`Movie: ${itemData[0].title}. User Review: ${userReview}. User Rate: ${userRate}`);

        itemData[0].userRate = userRate;
        itemData[0].userReview = userReview;

        console.log(`Movie: ${itemData[0].title}. User Review: ${itemData[0].userReview}. User Rate: ${itemData[0].userRate}`);

        saveMovie(itemData[0]);

    }

    // Since itemData is an array, we'll check if it's empty or not
    if (itemData.length === 1) {
        return (
            <Dialog
                visible={showAddMovieModalvalue}
                title={`ADD ${itemData[0].title.toUpperCase()} TO YOUR LIBRARY`}
                onTouchOutside={() => changesNotSaved()}
                dialogStyle={{
                    borderRadius: 10, backgroundColor: "#011627"
                }}
                titleStyle={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20
                }
                } >

                <View>

                    {/* Poster */}
                    <Image style={{ borderRadius: 10, aspectRatio: 1.5, resizeMode: "contain" }} source={{ uri: `https://image.tmdb.org/t/p/w500/${itemData[0].poster_path}` }} />
                    {/* Poster */}

                    {/* user Rate */}

                    {/* user Rate */}

                    {/* User Review */}
                    <Input
                        label={'WRITE A REVIEW:'}
                        placeholder="Max. 500 characters"
                        leftIcon={{ type: 'font-awesome', name: 'paragraph', color: "white" }}
                        inputStyle={{ fontWeight: "bold", color: "white", maxHeight: 100, paddingBottom: 10, textAlign: "justify" }}
                        containerStyle={{ paddingTop: 10 }}
                        onChangeText={value => userReview = value}
                        multiline={true}
                        maxLength={500}
                    />
                    {/* User Review */}

                    <View style={{ paddingBottom: 20 }}>
                        <AirbnbRating
                            count={10}
                            reviews={["REALLY bad  1/10", "Waste of time 2/10", "Could be better 3/10", "Hmm... 4/10", "Well... 5/10", "Made me think 6/10", "Good enough 7/10", "Must see 8/10", "Excellent! 9/10", "Such a masterpiece 10/10"]}
                            defaultRating={10}
                            size={20}
                            reviewSize={20}
                            onFinishRating={value => userRate = value}


                        />
                    </View>

                    <Button
                        title="SAVE MOVIE"
                        titleStyle={{ fontWeight: "bold" }}
                        buttonStyle={{ backgroundColor: "red" }}
                        containerStyle={{ alignSelf: "center", width: 250 }}
                        onPress={() => handleSaveMovie()}
                    // icon={<Icon
                    //     name="close"
                    //     size={20}
                    //     color="white"
                    // />}
                    />
                </View>
            </Dialog >
        )
    }

    return (
        <>
        </>
    )

}

export default AddMovieModal;