import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import ListLocalMovies from '../components/ListLocalMovies';
import { fetchSavedMovies } from '../library/storage/StorageFunctions';
import EditMovieModal from '../components/EditMovieModal';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class MyMoviesScreen extends Component {

    state = {
        data: [],
        isFetching: true,
        refreshing: false,
        showEditMovieModalvalue: false,
        itemData: []
    }

    componentDidMount() {
        console.log('MyMoviesScreen loaded succesfully')
        console.log(this.state.data.length)
        this.handleLocalData()
            .then((res) => {
                // console.log(res);
                this.setState({ data: res, isFetching: false, refreshing: false })

                this.props.navigation.addListener('focus', () => {
                    this.handleRefresh();
                });

            });


    };

    handleLocalData = async () => {
        let data = await fetchSavedMovies();
        let localMoviesData = JSON.parse(data);

        return localMoviesData;

        // console.log(this.state)
    };

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.handleLocalData()
                .then((res) => {
                    // console.log(res);
                    this.setState({ data: res, refreshing: false })

                });
        })
    }

    showEditMovieModal = (item) => {
        this.setState({ showEditMovieModalvalue: true });
        // console.log(`Add Movie Modal open: ${value}`);
        this.state.itemData.push(item)

    };

    hideEditMovieModal = () => {
        this.setState({ showEditMovieModalvalue: false, itemData: [] });
    };

    isOnlyOneItem = () => {
        if (this.state.data.length == 1) {
            return (
                console.log('ea')
            );
        } else {
            return (
                { backgroundColor: "black" }
            )
        };
    };

    render() {
        if (this.state.isFetching) {
            return (
                <View>
                    <Text>Fetching</Text>
                </View>
            )
        } else {
            return (

                <View style={{ backgroundColor: "black", flex: 1 }} >

                    {this.state.data !== null && this.state.data.length !== 0
                        ?
                        <View>

                            <FlatList
                                data={this.state.data}
                                style={styles.listMoviesContainer}
                                renderItem={({ item }) => (

                                    <ListLocalMovies
                                        item={item}
                                        refreshRender={this.handleRefresh}
                                        showEditMovieModal={this.showEditMovieModal}
                                    />

                                )}

                                ListHeaderComponent={
                                    <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "bold", paddingTop: 5, paddingBottom: 5 }}>You have {this.state.data.length} movie(s) on your library </Text>
                                }
                            />

                            <EditMovieModal itemData={this.state.itemData} showEditMovieModalvalue={this.state.showEditMovieModalvalue} hideEditMovieModal={this.hideEditMovieModal} />

                        </View>

                        :

                        <View style={styles.noMoviesContainer}>

                            <View style={styles.noMoviesTextContainer}>

                                <Text style={styles.noMoviesText}>THERE'S NO MOVIES HERE... WHY DON'T YOU ADD SOMETHING?</Text>

                            </View>

                        </View>

                    }
                </View>
            );
        };

    };
};

const styles = StyleSheet.create({

    noMoviesContainer: {
        backgroundColor: "black",
        height: screenHeight,
        width: screenWidth - 5,
        justifyContent: "center",
        alignContent: "center",
    },

    noMoviesTextContainer: {
        alignSelf: "center",
    },

    noMoviesText: {
        fontSize: 35,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    listMoviesContainer: {
        width: screenWidth - 5,
        alignSelf: "center",
    },
});

export default MyMoviesScreen;