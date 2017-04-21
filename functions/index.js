const functions = require('firebase-functions');
const moment = require('moment');

const twilioSid = functions.config().twilio.sid;
const twilioNumber = functions.config().twilio.number;
const twilioAuthToken = functions.config().twilio.token;

const client = require('twilio')(twilioSid, twilioAuthToken);

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
    const contactsRef = event.data.ref.root.child(`contacts/${uid}`);

    return inviteesRef.once('value').then((snap) => {
      snap.forEach((childSnap) => {
        contactsRef.child(childSnap.key).once('value').then((contactSnap) => {
          sendMessage(location, contactSnap.val(), (err, response) => {
            // sid
            console.log('Message sent', response);
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

  // MessageSid
  console.log(req.body);

  res.status(200).send("Ok, see you then.");
});

function sendMessage(location, contact, cb) {
  const options = {
    to: '+19172026936',
    from: twilioNumber,
    body: formatBody(location, contact)
  };

  client.messages.create(options, cb);
}

function formatBody(location, contact) {
  const time = moment(location.time).calendar().toLowerCase();

  return `Hey ${contact.name}. I'm going to ${location.place.name} ${time}. Wanna join?`
}
