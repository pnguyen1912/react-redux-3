import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addAlbum } from '../store/action'
class SelectedResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      album: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${this.props.id}&s_release_date=desc&g_album_name=1&apikey=3b7810549120a67648d617699c6fee1d`)
      .then(response => {
        console.log(response)
        let item = response.data.message.body.album_list.map(e => {
          return {
            name: e.album.album_name,
            genre: e.album.primary_genres.music_genre_list[0] ? e.album.primary_genres.music_genre_list[0].music_genre.music_genre_name_extended : 'N/A',
            rating: e.album.album_rating,
            label: e.album.album_label,
            id: e.album.album_id,
            releaseDate: e.album.album_release_date,
          }
        }

        )
        this.setState({ album: item })
        console.log(this.state)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <div class="card" style={{ float: 'right' }}>
          <div class="card-divider">
            Artist Info:
      </div>
          <div class="card-section">
            <p >Rating: {this.props.rating !== '' ? this.props.rating : 'N/A'}</p>
            <p >Location: {this.props.location !== '' ? this.props.location : 'N/A'}</p>
            <p >ID: {this.props.id !== '' ? this.props.id : 'N/A'}</p>
            <p >Twitter: {this.props.twitter !== '' ? <a target={'_blank'} href={this.props.twitter}>{this.props.name}</a> : 'N/A'}</p>
          </div>
        </div>

        <div>
          {this.state.album.map(item =>
            <div className="card" style={{ width: '70%' }}>
              <div className="card-divider">
                {item.name}
                <button onClick={() => this.props.addAlbum(item.name)}><span className="icon icon-add"></span></button>
              </div>
              <img style={{ float: 'left' }} src={'none'} alt={'n/a'}></img>
              <div className="card-section" style={{ textAlign: 'right' }}>
                <p>Genre: {item.genre}</p>
                <p>Release Date: {item.releaseDate}</p>
                <p>Rating: {item.rating}</p>
                <p>Label: {item.label}</p>
                <p>Album ID: {item.id}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addAlbum: album => dispatch(addAlbum(album)),
  }
}
export default connect(null, mapDispatchToProps)(SelectedResult)