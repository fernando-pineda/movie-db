import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { editMovie } from '../library/storage/StorageFunctions';
import { Image, Input, Button } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import { showMessage } from 'react-native-flash-message';

const EditMovieModal = ({ itemData, showEditMovieModalvalue, hideEditMovieModal }) => {


    let userReview, userRate;

    const changesNotSaved = () => {
        if (userReview !== undefined || userRate !== undefined) {
            Alert.alert(
                'HEY!',
                `Your changes won't be saved!`,
                [
                    {
                        text: 'EXIT',
                        onPress: () => hideEditMovieModal(),
                        style: 'cancel'
                    },
                    { text: 'STAY' }
                ],
                { cancelable: true }
            );
        } else {
            hideEditMovieModal();
        }
    }

    const handleEditMovie = () => {


        if (userRate !== undefined) {
            //The user changed their rate
            itemData[0].userRate = userRate;
        };

        if (userReview !== undefined) {
            // The user changed their review
            itemData[0].userReview = userReview;
        }

        if (userRate == undefined && userReview == undefined) {
            // There's no changes
            showMessage({
                message: `No changes were made!`,
                type: "info",
            })
            hideEditMovieModal();

        } else {
            // The user actually made changes 
            editMovie(itemData[0]);
            hideEditMovieModal();
            // setTimeout(refreshRender, 1)

        }
        // console.log(`Movie: ${itemData[0].title}. User Review: ${itemData[0].userReview}. User Rate: ${itemData[0].userRate}`);



    }

    // Since itemData is an array, we'll check if it's empty or not
    if (itemData.length === 1) {
        return (

            <Dialog
                visible={showEditMovieModalvalue}
                title={`EDIT ${itemData[0].title.toUpperCase()} FROM YOUR LIBRARY`}
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
                        label={'EDIT YOUR REVIEW:'}
                        placeholder="Max. 500 characters"
                        leftIcon={{ type: 'font-awesome', name: 'paragraph', color: "white" }}
                        inputStyle={{ fontWeight: "bold", color: "white", maxHeight: 100, paddingBottom: 10, textAlign: "justify" }}
                        containerStyle={{ paddingTop: 10 }}
                        onChangeText={value => userReview = value}
                        multiline={true}
                        maxLength={500}
                        defaultValue={itemData[0].userReview}
                    />
                    {/* User Review */}

                    <View style={{ paddingBottom: 20 }}>
                        <AirbnbRating
                            count={10}
                            reviews={["REALLY bad  1/10", "Waste of time 2/10", "Could be better 3/10", "Hmm... 4/10", "Well... 5/10", "Made me think 6/10", "Good enough 7/10", "Must see 8/10", "Excellent! 9/10", "Such a masterpiece 10/10"]}
                            defaultRating={itemData[0].userRate}
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
                        onPress={() => handleEditMovie()}
                    // icon={<Icon
                    //     name="close"
                    //     size={20}
                    //     color="white"
                    // />}
                    />
                </View>
            </Dialog >


            //     <Dialog
            //         visible={showEditMovieModalvalue}
            //         title={`Edit ${itemData[0].title} from your library`}
            //         onTouchOutside={() => changesNotSaved()}
            //         dialogStyle={{ borderRadius: 10 }}
            //         titleStyle={{ textAlign: "center" }} >

            //         <View>

            //             {/* Poster */}
            //             <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: `https://image.tmdb.org/t/p/w500/${itemData[0].poster_path}` }} />
            //             {/* Poster */}

            //             {/* user Rate */}
            //             <AirbnbRating
            //                 count={10}
            //                 reviews={["REALLY bad  1/10", "Waste of time 2/10", "Could be better 3/10", "Hmm... 4/10", "Well... 5/10", "Made me think 6/10", "Good enough 7/10", "Must see 8/10", "Excellent! 9/10", "Such a masterpiece 10/10"]}
            //                 defaultRating={itemData[0].userRate}
            //                 size={20}
            //                 reviewSize={20}
            //                 onFinishRating={value => userRate = value}

            //             />
            //             {/* user Rate */}

            //             {/* User Review */}
            //             <Input
            //                 placeholder="Write something else!"
            //                 leftIcon={{ type: 'font-awesome', name: 'paragraph' }}
            //                 containerStyle={{ height: 250 }}
            //                 inputStyle={{ height: 200 }}
            //                 onChangeText={value => userReview = value}
            //                 multiline={true}
            //                 maxLength={500}
            //                 defaultValue={itemData[0].userReview}

            //             />
            //             {/* User Review */}


            //             <Button
            //                 title="SAVE"
            //                 onPress={() => handleEditMovie()}
            //             />
            //         </View>
            //     </Dialog>
        )
    }

    return (
        <>
        </>
    )

}

export default EditMovieModal;