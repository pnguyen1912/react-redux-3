import { ADD_ARTIST } from './types';
import { ADD_ALBUM } from './types';
import { GET_ARTISTS } from './types'
import { GET_ALBUMS } from './types'

export const addArtist = artist => ({
  type: ADD_ARTIST,
  payload: artist,
});
export const addAlbum = album => ({
  type: ADD_ALBUM,
  payload: album,
});
export const getArtists = data => ({
  type: GET_ARTISTS,
  payload: data,
});
export const getAlbums = data => ({
  type: GET_ALBUMS,
  payload: data,
});