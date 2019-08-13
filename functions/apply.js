const headers = {
  'Access-Control-Allow-Origin': '*', // better change this for production
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = function(event, context, callback) {
  // only allow POST requests
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 410,
      body: JSON.stringify({
        message: 'Only POST requests allowed.',
      }),
    });
  }

  // parse the body to JSON so we can use it in JS
  const payload = JSON.parse(event.body);

  callback(null, {
    statusCode: 200,
    headers,
    body: payload,
  });
}
