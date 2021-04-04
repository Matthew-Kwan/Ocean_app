// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host


// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getSessions = (setSessions) => {
  // the URL for the request
  console.log("getSessions Function Called")
  const url = `${API_HOST}/api/sessions`;

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
      .then(res => {
          if (res.status === 200) {
              // return a promise that resolves with the JSON body
              return res.json();
          } else {
              alert("Could not get sessions");
          }
      })
      .then(json => {
          // the resolved promise with the JSON body
          setSessions(json.sessions);
      })
      .catch(error => {
          console.log(error);
      });
};

// A function to send a POST request with a new session
export const addSession = (session_data) => {
  // the URL for the request
  const url = `${API_HOST}/api/sessions`;

  // The data we are going to send in our request
  const session = session_data

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
      method: "post",
      body: JSON.stringify(session),
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
              console.log('Session Posted Successfully!')
              return res.json()
          } else {
              // If server couldn't add the student, tell the user.
              // Here we are adding a generic message, but you could be more specific in your app.
              alert("Could not post the session")
          }
      }).then(data => {
          return data.id
      }
      )
      .catch(error => {
          console.log("POST session error: ", error);
      });

      return result
};

// a function to handle PUT requests for sessions
export const updateSession = (session_data, id) => {
  // the URL for the request
  const url = `${API_HOST}/api/sessions/${id}`;

  // The data we are going to send in our request
  const session = session_data

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(session),
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
              console.log('Session Updated Successfully!')
              return res.json();
          } else {
              // If server couldn't add the student, tell the user.
              // Here we are adding a generic message, but you could be more specific in your app.
              alert("Could not post the session")
          }
      })
      .catch(error => {
          console.log("PUT session error: ", error);
      });
};
