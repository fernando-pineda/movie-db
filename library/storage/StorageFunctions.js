import { AsyncStorage } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

export const editMovie = async (movie) => {
    try {

        let data = await AsyncStorage.getItem('MOVIES');
        // Parse will create an object
        let MoviesArray = JSON.parse(data);
        // console.log(MoviesArray.length)

        for (let i = 0; i < MoviesArray.length; ++i) {

            if (MoviesArray[i].key == movie.key) {
                // console.log(`Old Rate: ${MoviesArray[i].userRate} New Rate: ${movie.userRate}`);
                // console.log(`Old Review: ${MoviesArray[i].userReview} New Rate: ${movie.userReview}`);
                // console.log(`There's a match: ${MoviesArray[i].key} with ${movie.title} in the position ${i}`)


                // Removing the object in the position i (where the match was found)
                MoviesArray.splice(i, 0)
                // Placing the new object with the user changes in the same position
                MoviesArray[i] = movie;
                MoviesArray.join()

                // Finally, storing the new data in asyncstorage

                await AsyncStorage.setItem(
                    'MOVIES',
                    JSON.stringify(MoviesArray)
                );



            }

        }

    } catch (e) {
        console.log('Something went wrong while changing your movies data', e)
    }


}

export const saveMovie = async (item) => {


    try {
        // At very first, we have to get the old array from the storage
        let oldMoviesArray = await AsyncStorage.getItem('MOVIES');
        let oldMoviesKeys = [];
        // Parse will create an object
        let newMoviesArray = JSON.parse(oldMoviesArray);
        // console.log(newMoviesArray)

        if (!newMoviesArray || newMoviesArray == null) {
            newMoviesArray = []
        }
        // Filling the keys array
        newMoviesArray.map(e => {
            oldMoviesKeys.push(e.key);
        });
        // Finding if there's a match between the array elements and the movie key
        let match = oldMoviesKeys.includes(item.key);

        if (match) {
            return (
                showMessage({
                    message: "Movie already added to your library!",
                    type: "info",
                })
            )
        } else {
            // If the movie doesn't exist, we push the item (which contains movie data) to the new movies array

            newMoviesArray.push(item);

            // Finally, we convert the new movies array to a string, and save 

            await AsyncStorage.setItem(
                'MOVIES',
                JSON.stringify(newMoviesArray)
            );

            console.log(`${item.title} successfully added to the user library`)

            return (
                showMessage({
                    message: `Successfully added ${item.title} to your library`,
                    type: "info",
                })

            )


        }

    } catch (error) {
        console.log('Something went wrong!', error)
    }

};

export const deleteMovie = async (item) => {
    try {
        // At very first, we have to get the old array from the storage
        let oldMoviesArray = await AsyncStorage.getItem('MOVIES');
        let newMoviesArray = []
        // Parse will create an object
        let newMoviesArrayParsed = JSON.parse(oldMoviesArray);

        newMoviesArrayParsed.map((e => {
            // console.log(`Dear ${e.title}: I'm looking for ${item.title} to be deleted`)
            // Filling the newMoviesArray with the objects who ARE NOT the item to be "removed"
            if (e.title !== item.title) {
                newMoviesArray.push(e)
            };
        }));

        // console.log(`Old array of objects count: ${newMoviesArrayParsed.length}, new array of objects count ${newMoviesArray.length}`);

        if (newMoviesArray.length < oldMoviesArray.length) {
            // Finally, we convert the new movies array to a string, and save 
            await AsyncStorage.setItem(
                'MOVIES',
                JSON.stringify(newMoviesArray)
            );

            console.log(`${item.title} successfully removed from the library`)

            return (
                showMessage({
                    message: `Successfully removed ${item.title} to your library`,
                    type: "info",
                })

            )


        }

    } catch (error) {
        console.log('Something went wrong!', error)
    }

}


export const fetchSavedMovies = async () => {

    try {

        let moviesData = await AsyncStorage.getItem('MOVIES')
        return moviesData;

    } catch (error) {

        console.log('Something went wrong!', error)

    }

}
