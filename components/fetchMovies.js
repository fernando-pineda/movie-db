import fetch from 'node-fetch';
import { showMessage, hideMessage } from "react-native-flash-message";


export const fetchTrending = async (key, page, instructions, genre, query) => {
    let movieData;

    try {

        // trailer instructions: movie/${movieId}/videos
        const url = `https://api.themoviedb.org/3/${instructions}?api_key=${key}&page=${page}&with_genres=${genre}&query=${JSON.stringify(query)}`;
        // console.log(url, 'coming from fetchTrending');
        const response = await fetch(url);
        movieData = await response.json();
        // console.log(movieData);

    } catch (error) {
        console.log(`Something happened! ${error}`);
    }

    // We call the function to treat the data (sending ONLY THE JSON RESULTS, which contains the movies data) and we save the response in a variable



    let moviesArray = handleMovieData(movieData.results, movieData.total_pages);
    // Don't forget that we can destructure the array in the future


    return moviesArray;

};


export const handleMovieData = (data, total_pages) => {

    let movies = [[], total_pages];
    // console.log(total_pages)

    // We loop through the array and keep only with the necessary information 
    data.map(element => {
        if (movies[0].length < 10) {
            let moviePropsObject = {
                key: element.id,
                title: element.title,
                overview: element.overview,
                release_date: element.release_date,
                vote_average: element.vote_average,
                poster_path: element.poster_path
            }
            movies[0].push(moviePropsObject)
        }

    });




    return movies;
};



export const fetchVideos = async (key, movieId) => {
    let trailerKeys = [];

    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;
        let response = await fetch(url);
        let data = await response.json()


        data.results.map(element => {

            trailerKeys.push(element.key)
        })

        return trailerKeys;

    } catch (error) {
        console.log(error)
    }
};

export const fetchMovieHomePage = async (movieId) => {

    let movieHomePage;

    try {

        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=7f7d3c394a0fc29c8ee8d41edc8a08fc`;
        const response = await fetch(url);
        let movieData = await response.json();

        movieHomePage = `https://www.imdb.com/title/${movieData.imdb_id}`;
        // console.log(movieHomePage)
        return movieHomePage;

    } catch (error) {

        console.log('Something went wrong fetching the homepage', error);

    }

};