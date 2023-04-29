import { google } from 'googleapis';
import { authorize } from "./auth.js";


function getChannel(auth) {
    const service = google.youtube('v3');

    service.playlists.list({
      auth: auth,
      part:'snippet',
      mine:true,
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      const channels = response.data.items;
      console.log(channels);
    });
  }


  authorize(getChannel);
