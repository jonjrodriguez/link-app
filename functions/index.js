const functions = require('firebase-functions');
const moment = require('moment');

const twilioSid = functions.config().twilio.sid;
const twilioAuthToken = functions.config().twilio.token;

const twilio = require('twilio');
const client = twilio(twilioSid, twilioAuthToken);

exports.textInvitees = functions.database.ref('/locations/{uid}/{locationId}')
  .onWrite((event) => {
    // Data updated -- Not first created
    if (event.data.previous.exists()) {
      console.log('Event updated');
      return;
    }

    // Data deleted
    if (!event.data.exists()) {
      console.log('Event deleted');
      return;
    }

    console.log('Event created');

    const { uid, locationId } = event.params;
    const location = event.data.val();

    const inviteesRef = event.data.ref.root.child(`invitees/${uid}/${locationId}`);
    const userRef = event.data.ref.root.child(`users/${uid}`);
    const contactsRef = event.data.ref.root.child(`contacts/${uid}`);

    return inviteesRef.once('value').then((snap) => {
      userRef.once('value').then((userSnap) => {
        const user = userSnap.val();

        snap.forEach((childSnap) => {
          contactsRef.child(childSnap.key).once('value').then((contactSnap) => {
            sendMessage(location, user, contactSnap.val(), (err, response) => {
              console.log('Message sent', response);
            });
          });
        });
      });
    });
  });

exports.confirmInvite = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).send('Forbidden!');
    return;
  }

  console.log(req.body);

  message = 'Ok, see you then.';

  const twiml = new twilio.TwimlResponse();
  twiml.message(message);
  res.writeHead(200, { 'Content-Type':'text/xml' });
  res.end(twiml.toString());
});

function sendMessage(location, from, contact, cb) {
  const options = {
    to: contact.e164,
    from: from.e164,
    body: formatBody(location, from, contact)
  };

  client.messages.create(options, cb);
}

function formatBody(location, from, contact) {
  const time = moment(location.time).calendar().toLowerCase();

  return `Hey ${contact.name}, it's ${from.name}. I'm going to ${location.place.name} ${time}. Wanna join? Just reply yes or no.`
}
