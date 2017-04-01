function createSession(cb) {
  fetch('/api/q/create', {
      method: 'POST'
    })
    .then(parseJSON)
    .then(cb);
}

function parseJSON(response) {
  return response.json();
}

const Client = {createSession}

export default Client;
