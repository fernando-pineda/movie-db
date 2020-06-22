import React, { Component } from 'react';
import { View, Text, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const LoadingScreen = (isLoading, loadingComplete) => {

    setTimeout(() => {
        loadingComplete
        console.log('webos')
    }, 2500);

    return (

        <Modal
            visible={isLoading}
            animationType="slide"
        >

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
                <Image
                    source={{ uri: 'https://i.imgur.com/M9ULJ5A.png' }}
                    style={{ borderRadius: 10, width: screenWidth - 50, height: 70 }}
                />

                <ActivityIndicator size="large" color="white" />
            </View>

        </Modal>
    )

}

export default LoadingScreen;