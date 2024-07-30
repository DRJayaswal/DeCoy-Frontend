import axios from 'axios';

const clientId = 'd73b7d1c71ae447b878b21f56cac2adb';
const clientSecret = 'e0be9199d02e49b98b99d6f0f27de1e7';

const authString = btoa(`${clientId}:${clientSecret}`);

export const getSpotifyToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
};