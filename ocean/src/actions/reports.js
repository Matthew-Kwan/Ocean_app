// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

console.log("API HOST: ", API_HOST)


// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getReports = (setreports) => {
    // the URL for the request
    console.log("getreport Function Called")
    const url = `${API_HOST}/api/reports`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get reports");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            setreports(json.reports);
        })
        .catch(error => {
            console.log(error);
        });
};

export const addReport = (report) => {
    // the URL for the request
    const url = `${API_HOST}/api/reports`;

    // The data we are going to send in our request
    // const student = formComp.state

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(report),
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
            if (res.status === 201) {
                // If student was added successfully, tell the user.
                console.log('report succesfully sent')
                // dashboardComp.setState({
                //     message: {
                //         body: "Success: Added a student.",
                //         type: "success"
                //     }
                // });
            } else {
                console.log(res.status)
                console.log('report failed to sent')
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                // dashboardComp.setState({
                //     message: {
                //         body: "Error: Could not add student.",
                //         type: "error"
                //     }
                // });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteReport = (reportID) => {
    // the URL for the request
    const url = `${API_HOST}/api/reports/${reportID}`;
    console.log('trying to delete')
    console.log(url)
    // The data we are going to send in our request

    const request = new Request(url, {
        method: "delete",
        // body: JSON.stringify(report),
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
            if (res.status === 202) {
                // If student was added successfully, tell the user.
                console.log('report succesfully deleted')
                return res

            } else {
                console.log('report failed to delete')
            }
        })
        .catch(error => {
            console.log(error);
        });

    return result
};

export const markReviewed = (report) => {
    // the URL for the request
    const url = `${API_HOST}/api/reports/${report._id}`;

    // The data we are going to send in our request
    // const student = formComp.state

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(report),
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
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log('report succesfully patched')
                // dashboardComp.setState({
                //     message: {
                //         body: "Success: Added a student.",
                //         type: "success"
                //     }
                // });
            } else {
                console.log('report failed to mark as reviewd')
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                // dashboardComp.setState({
                //     message: {
                //         body: "Error: Could not add student.",
                //         type: "error"
                //     }
                // });
            }
        })
        .catch(error => {
            console.log(error);
        });
};