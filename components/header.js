import React, { Component } from 'react';
import { Image } from 'react-native-elements';
import { View, Text, Dimensions } from 'react-native';
import { NavBar } from 'galio-framework';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DefaultHeader = () => {
    return (
        <Text style={{
            color: "red",
            backgroundColor: "black",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            width: screenWidth,
            paddingTop: 25
        }}> MOVIENATOR</Text>

    )
}


export default DefaultHeader;