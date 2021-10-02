let accessToken;
const clientID = '819eee2a867f4306bb4ee16cf9009564';
const redirectURI = 'http://jamming-mars.surge.sh'

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //check the url
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);

      //wipes the access token and URL parameters.
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`

      window.location = accessUrl
    }

  },

  search(term) {
    let accesToken = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (!data.tracks) {
          return [];
        }

        return data.tracks.items.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }))
      });
  },

  savePlaylist(playListName, tracksURI) {
    if (!playListName || !tracksURI.length) {
      return;
    }

    let accesToken = this.getAccessToken();
    let headers = { Authorization: 'Bearer ' + accesToken }
    let userId;
    let playlistID;

    return fetch(`https://api.spotify.com/v1/me`, {
      method: 'GET',
      headers: headers
    }).then(response => response.json())
      .then(data => {
        userId = data.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ name: playListName })
        }).then(response => response.json())
          .then(data => {
            playlistID = data.id
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                uris: tracksURI
              })
            }).then(response => response.json())
              .then(data => {
                playlistID = data.id
              })
          })
      })

  }

}


export default Spotify;