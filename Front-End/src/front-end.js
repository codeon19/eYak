function createSession(cb) {
  fetch('/api/q/create', {
      method: 'POST'
    })
    .then(parseJSON)
    .then(cb);
}

function getQuestionBoard(id, cb) {
  fetch('/api/q/' + id)
    .then(parseJSON)
    .then(cb);
}

function checkMasterKey(id, key, cb) {
  fetch('/api/q/' + id + '/master/' + key)
    .then(parseJSON)
    .then(cb);
}

function parseJSON(response) {
  return response.json();
}

const Client = {createSession, getQuestionBoard}

export default Client;
