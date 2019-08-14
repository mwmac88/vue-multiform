const Busboy = require('busboy');
const headers = {
  'Access-Control-Allow-Origin': '*', // better change this for production
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = function(event, context, callback) {
  var contentType = event.headers['Content-Type'] || event.headers['content-type'];
  var bb = new Busboy({ headers: { 'content-type': contentType } });

  // only allow POST requests
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 410,
      body: JSON.stringify({
        message: 'Only POST requests allowed.',
      }),
    });
  }

  bb.on('field', (fieldname, val) => console.log('Field [%s]: value: %j', fieldname, val))
    .on('finish', () => {
      console.log('Done parsing form!');
      // context.succeed({ statusCode: 200, body: 'all done', headers });
      callback(null, {
        statusCode: 200,
        headers,
        body: 'DONE'
      });
    })
    .on('error', err => {
      console.log('failed', err);
      // context.fail({ statusCode: 500, body: err, headers });
    });

  bb.end(event.body);

  // callback(null, {
  //   statusCode: 200,
  //   headers,
  //   body: 'DONE'
  // });
}
