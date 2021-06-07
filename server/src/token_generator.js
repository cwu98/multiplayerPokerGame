const twilio = require('twilio');
const config = require('./config');

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

function token_generator(identity) {

  // Create a "grant" which enables a client to use Chat as a given user
  const chatGrant = new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.addGrant(chatGrant);
  token.identity = identity || 'Unknown';
  console.log(token.identity);
  return {
    identity: token.identity,
    token: token.toJwt()
  };
}

module.exports = token_generator;
