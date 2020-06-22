import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, Modal } from 'react-native';
import { Input, Button, ButtonGroup, Image } from 'react-native-elements';
import { fetchTrending, fetchVideos } from '../components/fetchMovies';
import ListAPIMovies from '../components/ListAPIMovies';
import { showMessage } from "react-native-flash-message";
import AddMovieModal from '../components/AddMovieModal';
import WatchTrailerModal from '../components/WatchTrailerModal';
import { validateQuery } from '../library/utils/validators';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ExploreMoviesScreen extends Component {

    constructor() {
        super()

        this.state = {
            toggleLoadingScreen: true,
            isFetching: true,
            key: '7f7d3c394a0fc29c8ee8d41edc8a08fc',
            page: 1,
            data: [],
            refreshing: false,
            defaultPickerValue: 'Trending',
            currentGenre: '',
            currentSearchInstructions: '',
            currentQuery: '',
            showAddMovieModal: false,
            showWatchTrailerModalvalue: false,
            itemData: [],
            trailerData: [],
            selectedIndex: 1,
        };

    };

    searchInstructions = {
        trending: 'trending/movie/week',
        upcoming: 'movie/upcoming',
        discover: 'discover/movie',
        search: 'search/movie',
        searchValue: '',
        showAddMovieModal: false
    }

    searchGenres = [
        { label: 'Action', value: 28 },
        { label: 'Adventure', value: 12 },
        { label: 'Animation', value: 16 },
        { label: 'Comedy', value: 35 },
        { label: 'Crime', value: 80 },
        { label: 'Documentary', value: 99 },
        { label: 'Drama', value: 18 },
        { label: 'Family', value: 10751 },
        { label: 'Fantasy', value: 14 },
        { label: 'History', value: 36 },
        { label: 'Horror', value: 27 },
        { label: 'Music', value: 10402 },
        { label: 'Mystery', value: 9648 },
        { label: 'Romance', value: 10749 },
        { label: 'Science Fiction', value: 878 },
        { label: 'Thriller', value: 53 },
        { label: 'War', value: 10752 },
        { label: 'Western', value: 37 }

    ]



    componentDidMount() {
        console.log('ExploreMoviesScreen loaded')



        this.handleData(this.searchInstructions.trending).then((res) => {
            // console.log(res);
            this.setState({ data: res, refreshing: false, currentSearchInstructions: this.searchInstructions.trending, trailersLoading: true, selectedIndex: 0, currentQuery: '' })
            // console.log(this.state.data, this.state.isFetching, 'DONE')

            setTimeout(() => {
                this.setState({ isFetching: false })

            }, 4000);

        })



    }

    handleData = async (searchInstructions, genre, query) => {
        // Fetching the movies data
        let moviesData = await fetchTrending(this.state.key, this.state.page, searchInstructions, genre, query);
        return moviesData;

    };


    handleChangeGenre = (searchInstructions, genreValue) => {

        if (genreValue == 'Trending') {
            searchInstructions = this.searchInstructions.trending
            genreValue = 0
            this.setState({ currentSearchInstructions: this.searchInstructions.trending, page: 1 })
        }

        this.setState({
            page: 1,
            currentGenre: genreValue,
            refreshing: true
        }, () => {
            this.handleData(searchInstructions, genreValue).then((res) => {
                // This following piece of code will take the ref (moviesList) and scroll to the top of the list 
                // console.log(res[0].length)
                if (res[0].length >= 1 && this.state.data[0].length >= 1) {
                    this.refs.moviesList.scrollToOffset({ animated: true, offset: 0 });
                }
                this.setState({ data: res, refreshing: false, currentSearchInstructions: searchInstructions, page: 1, currentQuery: '', selectedIndex: 0 })
                // console.log(`Data lenght: ${this.state.data.length}`)
            })
        })

    }

    handleSearch = (query) => {

        // console.log(`The query is ${query}`)

        let queryIsRight = validateQuery(query);
        // console.log(queryIsRight)
        if (queryIsRight) {

            showMessage({
                message: "Looking for a movie...",
                type: "info",
            });


            this.setState({
                refreshing: true, page: 1
            }, () => {
                this.handleData(this.searchInstructions.search, 0, query).then((res) => {
                    // This following piece of code will take the ref (moviesList) and scroll to the top of the list 
                    if (res[0].length >= 1 && this.state.data[0].length >= 1) {
                        this.refs.moviesList.scrollToOffset({ animated: true, offset: 0 });
                    }

                    let data = null;

                    if (res.length >= 1) {
                        data = res
                    }


                    // console.log(data)
                    this.setState({ data: data, refreshing: false, currentSearchInstructions: this.searchInstructions.search, currentQuery: query })

                    this.refs.input.clear()


                })
            })
        }
    }


    // onEndReached = async () => {
    //     if (this.state.page == 1) {
    //         await fetchTrending(this.state.key, this.state.page + 1, this.state.currentSearchInstructions, this.state.currentGenre).then((res) => {
    //             // console.log(res)
    //             this.setState(state => ({ data: [...state.data, ...res], page: 2 }))
    //         })
    //     } else {
    //         showMessage({
    //             message: "If you're looking for a specific movie, use the search bar!",
    //             type: "info",
    //         })
    //     }
    // };

    showAddMovieModal = (item) => {
        this.setState({ showAddMovieModal: true });
        // console.log(`Add Movie Modal open: ${value}`);
        this.state.itemData.push(item)
        // console.log(this.state.itemData[0].title, 'from showAddMovieModal')
    };

    hideAddMovieModal = () => {
        this.setState({ showAddMovieModal: false, itemData: [] });
    }

    showWatchTrailerModal = (item) => {

        this.getTrailersId(item).then((res) => {

            this.state.trailerData.push(item.title, res[0]);

            console.log(`Watch Trailer Modal open: ${this.state.showWatchTrailerModalvalue}. Data: ${this.state.trailerData}`);

            this.setState({ showWatchTrailerModalvalue: true });

        })
    };

    hideWatchTrailerModal = () => {
        this.setState({ showWatchTrailerModal: false, trailerData: [] });
    };

    getTrailersId = async (item) => {

        let idsArray = await fetchVideos(this.state.key, item.key)
        // console.log(item.title)
        // console.log(idsArray)
        return idsArray;
    };

    onPagePress = async (selectedIndex) => {
        let newIndex = selectedIndex + 1;

        if (selectedIndex !== this.state.selectedIndex) {


            this.refs.moviesList.scrollToOffset({ animated: true, offset: 0 });

            await fetchTrending(this.state.key, newIndex, this.state.currentSearchInstructions, this.state.currentGenre, this.searchInstructions.searchValue).then((res) => {

                // console.log(`Data received: ${res}`)

                this.setState({ data: res, refreshing: true, selectedIndex: selectedIndex }, () => {

                    this.setState({ refreshing: false, currentQuery: '' });

                });

            });
        };


    };



    render() {

        const getPagesButtons = () => {

            let buttons = [];

            //The API will send back almost 1000 pages per genre, so we'll create the buttons array depending on if the api is sending back 1000 or less. 

            if (this.state.data[1] >= 5) {
                buttons = [1, 2, 3, 4, 5]
            } else {
                for (let i = 0; i < this.state.data[1]; ++i) {
                    buttons.push(i + 1);
                }
            }

            buttons.join();
            // console.log(buttons, this.state.data[1])
            return buttons;
        };

        let buttons = getPagesButtons();

        if (this.state.isFetching) {
            return (
                <Modal
                    visible={this.state.isFetching}
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
        } else {
            return (

                <View style={{ backgroundColor: "black", flexDirection: "column", flex: 1 }}>

                    {/* FLEX #1*/}

                    {/* Search bar*/}

                    <View style={{ backgroundColor: "black", flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingTop: 10 }}>

                        <Input
                            ref="input"
                            placeholder="Looking for a movie?"
                            onChangeText={value => this.searchInstructions.searchValue = value}
                            maxLength={25}
                            onSubmitEditing={() => this.handleSearch(this.searchInstructions.searchValue)}
                            containerStyle={{ height: 45, backgroundColor: "white", borderTopRightRadius: 10, borderBottomRightRadius: 10, flex: 4 }}
                            inputContainerStyle={{ color: "white" }}

                        />
                        <Button

                            icon={<Icon
                                name="search"
                                size={25}
                                color="white"
                            />}
                            onPress={() => this.handleSearch(this.searchInstructions.searchValue)}
                            buttonStyle={{ backgroundColor: "red" }}
                            containerStyle={{ paddingLeft: 10, paddingRight: 10, width: 50, flex: 1 }}
                        />

                    </View>

                    {/* Search bar */}

                    {/* Genre dropdown */}
                    <View style={{ backgroundColor: "red", width: screenWidth - 5, alignItems: "center", borderRadius: 5, }}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Trending',
                                value: 'Trending',

                            }}
                            style={{ placeholder: { color: "white" } }}
                            onValueChange={(value) => this.handleChangeGenre(this.searchInstructions.discover, value)}
                            items={this.searchGenres}

                        />
                    </View>

                    {/* Genre dropdown */}



                    {/* FLEX #1*/}



                    {/* FLEX #2 */}

                    {this.state.data !== null && this.state.data[0].length !== 0 ?

                        <View style={{ flex: 1, width: screenWidth - 5 }}>
                            <FlatList ref="moviesList"
                                data={this.state.data[0]}

                                renderItem={({ item }) => {
                                    return (
                                        <ListAPIMovies item={item}
                                            showAddMovieModal={this.showAddMovieModal}
                                            showWatchTrailerModal={this.showWatchTrailerModal} />
                                    )
                                }}
                                refreshing={this.state.refreshing}

                                ListFooterComponent={
                                    <ButtonGroup
                                        onPress={this.onPagePress}
                                        selectedIndex={this.state.selectedIndex}
                                        buttons={buttons}
                                        containerStyle={{ height: 50, backgroundColor: "#011627" }}
                                        textStyle={{ fontWeight: "bold", color: "white" }}
                                        selectedButtonStyle={{ backgroundColor: "red" }}
                                    />

                                }
                            />
                        </View>

                        :
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 35, color: "white" }}>There's nothing to see here...</Text>
                        </View>
                    }
                    {/* FLEX #2 */}

                    <AddMovieModal showAddMovieModalvalue={this.state.showAddMovieModal} hideMovieModal={this.hideAddMovieModal} itemData={this.state.itemData} />

                    <WatchTrailerModal showWatchTrailerModalvalue={this.state.showWatchTrailerModalvalue} hideWatchTrailerModal={this.hideWatchTrailerModal} trailerData={this.state.trailerData} />

                </View>


            )
        };
    };
};


const styles = StyleSheet.create({
    listAPIMoviesContainer: {
        width: screenWidth - 5,
        alignSelf: "center",
        flex: 10
    },
});

export default ExploreMoviesScreen;

