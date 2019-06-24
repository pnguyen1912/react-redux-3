import { ADD_ARTIST } from './types';
import { ADD_ALBUM } from './types';
import { GET_ARTISTS } from './types'
import { GET_ALBUMS } from './types'
import axios from 'axios'



const initialState = {
  artists: [],
  albums: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS:
      return {
        artists: action.payload.sort((a, b) => b.count - a.count),
        albums: [...state.albums]
      }
    case GET_ALBUMS:
      return {
        albums: action.payload.sort((a, b) => b.count - a.count),
        artists: [...state.artists]
      }
    case ADD_ARTIST:
      if (state.artists.map(item => item.name).includes(action.payload)) {
        const index = state.artists.map(item => item.name).indexOf(action.payload)
        console.log(index)
        const newObj = {
          name: action.payload,
          id: state.artists[index].id,
          count: state.artists[index].count + 1
        }
        let newArray = [...state.artists]
        newArray.splice(index, 1)
        newArray = [...newArray, newObj]
        newArray.sort((a, b) => b.count - a.count)
        axios.put(`https://5d10dc6fbebb9800143d1bba.mockapi.io/artists/${newObj.id}`, { "count": newObj.count })
          .then(response => console.log('success'))
          .catch(err => console.log('err'))
        return {
          artists: newArray,
          albums: [...state.albums]
        }
      }
      else {
        let newObj = {
          name: action.payload,
          id: state.artists.length + 1,
          count: 1
        }
        axios.post(`https://5d10dc6fbebb9800143d1bba.mockapi.io/artists`, newObj)
          .then(response => console.log('success'))
          .catch(err => console.log('err'))
        return { artists: [...state.artists, newObj], albums: [...state.albums] }
      }
    case ADD_ALBUM:
      if (state.albums.map(item => item.name).includes(action.payload)) {
        const index = state.albums.map(item => item.name).indexOf(action.payload)
        console.log(index)
        const newObj = {
          name: action.payload,
          id: state.albums[index].id,
          count: state.albums[index].count + 1
        }
        let newArray = [...state.albums]
        newArray.splice(index, 1)
        newArray = [...newArray, newObj]
        newArray.sort((a, b) => b.count - a.count)
        axios.put(`https://5d10dc6fbebb9800143d1bba.mockapi.io/albums/${newObj.id}`, { "count": newObj.count })
          .then(response => console.log('success'))
          .catch(err => console.log('err'))
        return {
          albums: newArray,
          artists: [...state.artists]
        }
      }
      else {
        let newObj = {
          name: action.payload,
          id: state.albums.length + 1,
          count: 1
        }
        axios.post(`https://5d10dc6fbebb9800143d1bba.mockapi.io/albums`, newObj)
          .then(response => console.log('success'))
          .catch(err => console.log('err'))
        return { albums: [...state.albums, newObj], artists: [...state.artists] }
      }
    default:
      return state;
  }
};