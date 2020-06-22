import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text } from 'react-native';



const AddMovie = ({ item, showAddMovieModal, showWatchTrailerModal }) => {



    const handleOpenAddMovieModal = (item) => {
        // I had to do this because it was calling the function in an infinite loop lol
        showAddMovieModal(item);
        // console.log(`Sending: ${item.title} through handleOpenModal`)
    }

    const handleShowWatchTrailerModal = (item) => {
        showWatchTrailerModal(item)
    }

    return (
        <View>
            <Button title="ADD TO YOUR LIBRARY" icon={< Icon name="plus-square" size={15} color="white" />} onPress={() => { handleOpenAddMovieModal(item) }} />

            < Button title="WATCH TRAILERS" onPress={() => { handleShowWatchTrailerModal(item) }} />
        </View >
    )

}

export default AddMovie;