import { showMessage, hideMessage } from "react-native-flash-message";

// I created this section because I'll add users in the future



export const validateQuery = (query) => {

    let re = /[^A-Za-z0-9 ]+/;

    if (query === undefined || query === "" || re.test(query) === true) {

        showMessage({
            message: "Please input valid characters",
            type: "info",
        });

        return false

    } else { return true }


}
