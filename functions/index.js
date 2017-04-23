const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
const moment = require('moment-timezone');

admin.initializeApp(functions.config().firebase);

const twilioSid = functions.config().twilio.sid;
const twilioAuthToken = functions.config().twilio.token;
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

  const from = req.body.From;
  const to = req.body.To;
  const body = req.body.Body.toLowerCase().trim();

  console.log(from, to, body);

  const contactRef = admin.database().ref('contacts');
  const latestLocationRef = admin.database().ref('latestInviteLocation');
  const usersRef = admin.database().ref('users').orderByChild('e164').equalTo(to).limitToFirst(1);

  return usersRef.once('child_added').then((snap) => {
    const userKey = snap.key;

    contactRef.child(userKey).orderByChild('e164').equalTo(from).limitToFirst(1)
      .once('child_added').then((contactSnap) => {
        const inviteeKey = contactSnap.key;

        latestLocationRef.child(inviteeKey).once('value')
          .then((locationSnap) => {
            const locationKey = locationSnap.val();

            updateInvite(userKey, inviteeKey, locationKey, body);
            sendResponse(res, body, locationKey);
          });
      });
  });
});

function updateInvite(userKey, inviteeKey, locationKey, reply) {
  if (locationKey === null) {
    return;
  }

  let response = '';
  if (reply === 'yes') {
    response = true;
  }

  if (reply === 'no') {
    response = false;
  }

  if (response === '') {
    return;
  }

  const updates = {};
  updates[`invitees/${userKey}/${locationKey}/${inviteeKey}/response`] = response;
  updates[`invitees/${userKey}/${locationKey}/${inviteeKey}/updatedAt`] = new Date().getTime();

  return admin.database().ref().update(updates);
}

function sendResponse(res, reply, locationKey) {
  let message = 'Sorry, just reply yes or no.';
  if (reply === 'yes') {
    message = 'Ok, see you then.';
  }

  if (reply === 'no') {
    message = 'Ok, maybe next time.';
  }

  if (locationKey === null) {
    message = 'Sorry, I\'m not going any more.';
  }

  const twiml = new twilio.TwimlResponse();
  twiml.message(message);
  res.writeHead(200, { 'Content-Type':'text/xml' });
  res.end(twiml.toString());
}

function sendMessage(location, from, contact, cb) {
  const options = {
    to: contact.e164,
    from: from.e164,
    body: formatBody(location, from, contact)
  };

  client.messages.create(options, cb);
}

function formatBody(location, from, contact) {
  const time = moment(location.time).tz("America/New_York").calendar().toLowerCase();

  return `Hey ${contact.name}, it's ${from.name}. I'm going to ${location.place.name} ${time}. Wanna join? Just reply yes or no.`
}
