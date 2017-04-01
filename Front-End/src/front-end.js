function createQueue(cb) {
  fetch('/api/q/create', {
      method: 'POST'
    })
    .then(parseJSON)
    .then(cb);
}

const front-end = {createSession}

export default front-end;
