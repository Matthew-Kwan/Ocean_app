// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

console.log("API HOST: ", API_HOST)


// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getUsers = (setUsers) => {
    // the URL for the request
    console.log("getUser Function Called")
    const url = `${API_HOST}/api/users`;

    // Since this is a GET request, simply call fetch on the URL
    const result = fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get users");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            setUsers(json.users);
            return json.users
        })
        .catch(error => {
            console.log(error);
        });
    
    return result;
};

// and then loop through them and add a list element for each student
export const getUser = (id) => {
    // the URL for the request
    console.log("getUser Function Called")
    const url = `${API_HOST}/api/users/${id}`;

    // Since this is a GET request, simply call fetch on the URL
    const result = fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get user with id "+id);
            }
        })
        .catch(error => {
            console.log(error);
        });
    
    return result
};


// A function to send a POST request with a new user
export const addUser = (user_data) => {
    // the URL for the request
    const url = `${API_HOST}/api/users`;
  
    // The data we are going to send in our request
    const user = user_data
  
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
  
    // Send the request with fetch()
    const result = fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 201) {
                // If student was added successfully, tell the user.
                console.log('User Posted Successfully!')
                return res.json()
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                alert("Could not post the user")
            }
        }).then(data => {
            return data.id
        }
        )
        .catch(error => {
            console.log("POST user error: ", error);
        });
  
        return result
  };
  
// a function to handle PUT requests for users
export const updateUser = (user_data, id) => {
    // the URL for the request
    const url = `${API_HOST}/api/users/${id}`;
  
    // The data we are going to send in our request
    const user = user_data
  
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
        // Send the request with fetch()
    fetch(request)
    .then(function (res) {
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 202) {
            // If student was added successfully, tell the user.
            console.log('User Updated Successfully!')
            return res.json();
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            alert("Could not update the user")
        }
    })
    .catch(error => {
        console.log("PUT user error: ", error);
    });
};

// a function to handle PUT requests for users
export const updateUserAddGoal = (goal_data, id) => {
    // the URL for the request
    const url = `${API_HOST}/api/users/${id}/goal`;
  
    // The data we are going to send in our request
    const goal = goal_data
  
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "PUT",
        body: JSON.stringify(goal),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
    });

        // Send the request with fetch()
    const result = fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 202) {
                // If student was added successfully, tell the user.
                console.log('User Updated Successfully!')
                return res.json();
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                alert("Could not update the user")
            }
        })
        .catch(error => {
            console.log("PUT user error: ", error);
        });
    
    return result
};

// a function to handle DELETE requests for users
export const deleteUser = (id) => {
    // the URL for the request
    const url = `${API_HOST}/api/users/${id}`;
  
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "DELETE",
    });
        // Send the request with fetch()
    const result = fetch(request)
    .then(function (res) {
        console.log('fetched the request result')

        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 202) {
            // If student was deleted successfully, tell the user.
            console.log('User Deleted Successfully!')
            return res.json();
        } else {
            // If server couldn't delete the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            alert("Could not delete the user")
        }
    })
    .catch(error => {
        console.log("DELETE user error: ", error);
    });

    return result
};


