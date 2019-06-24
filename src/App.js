import React from 'react';
import Home from './components/Home'
import { Route, Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import SelectedResult from './components/SelectedResult'
import { connect } from 'react-redux'
import { addArtist, addAlbum, getArtists, getAlbums } from './store/action'
import TopAlbums from './components/TopAlbums'
import TopArtists from './components/TopArtists'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      search: []
    }
  }

  componentDidMount() {
    axios.get(`https://5d10dc6fbebb9800143d1bba.mockapi.io/artists`)
      .then(response => this.props.getArtists(response.data))
      .catch(err => console.log(err))

    axios.get(`https://5d10dc6fbebb9800143d1bba.mockapi.io/albums`)
      .then(response => this.props.getAlbums(response.data))
      .catch(err => console.log(err))
  }


  handleSubmit = (e) => {
    this.props.history.push('/search')
    axios.get(`https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${this.state.input}&apikey=3b7810549120a67648d617699c6fee1d`)
      .then(response => {
        let item = response.data.message.body.artist_list.slice(0, 5).map(e => {
          return {
            name: e.artist.artist_name,
            rating: e.artist.artist_rating,
            twitter: e.artist.artist_twitter_url,
            location: e.artist.artist_country,
            id: e.artist.artist_id,
          }
        }

        )
        this.setState({ search: item })

        console.log(response)
        console.log(this.state)
      })
      .catch(err => console.log(err))
    this.setState({ input: '' })

  }

  voteArtist = (val) => {
    this.props.addArtist(val)
  }




  render() {
    return (
      <div>
        <header className="App-header">
          <Link to='/'><div style={{ color: 'white' }}>Music</div></Link>
          <div className='inputbox'>
            <div className="input-group">
              <input value={this.state.input} onChange={e => this.setState({ input: e.target.value })} onKeyDown={e => e.key === 'Enter' ? this.handleSubmit() : null} className="input-group-field" type="text" placeholder='Search Artist' />
              <div className="input-group-button">
                <input onClick={this.handleSubmit} type="submit" className="" value="Search" />
              </div>
            </div></div>
        </header>

        <h2>
          <Link to='/topartists'>Top Artist:</Link> {this.props.artists.length > 0 ? this.props.artists.map(e => `${e.name}(${e.count})`) : 'No Artists Ranked Yet!'}
        </h2>
        <h2>
          <Link to='/topalbums'>Top Album:</Link> {this.props.albums.length > 0 ? this.props.albums.map(e => `${e.name}(${e.count})`) : 'No Albums Ranked Yet!'}
        </h2>
        <br />
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <Route exact path='/' render={() => <Home />} ></Route>
          <Route path='/search' render={() =>
            <div>
              {
                (this.state.search.length > 0)
                  ? (
                    <div>
                      {this.state.search.map(item =>
                        <div id={item.id} className="card">
                          <div className="card-divider">
                            <Link to={`/artists/${item.id}`}>{item.name}</Link>
                            <span onClick={() => this.voteArtist(item.name)} className='icon icon-add'></span>
                          </div>
                          <div className="card-section">
                            <div className='row'> <p className='columns'>Rating: {item.rating !== '' ? item.rating : 'N/A'}</p>
                              <p className='columns'>Twitter: {item.twitter !== '' ? <a target={'_blank'} href={item.twitter}>{item.name}</a> : 'N/A'}</p>
                              <p className='columns'>Location: {item.location !== '' ? item.location : 'N/A'}</p>
                              <p className='columns'>ID: {item.id !== '' ? item.id : 'N/A'}</p></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                  :
                  (
                    <div>No result found</div>
                  )
              }
            </div>

          }></Route>

          <Route path='/topartists' render={() => <TopArtists />}></Route>
          <Route path='/topalbums' render={() => <TopAlbums />}></Route>

          {this.state.search.map(item =>
            <Route path={`/artists/${item.id}`} render={() => <SelectedResult name={item.name} id={item.id} location={item.location} twitter={item.twitter} />}></Route>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addArtist: artist => dispatch(addArtist(artist)),
    addAlbum: album => dispatch(addAlbum(album)),
    getArtists: data => dispatch(getArtists(data)),
    getAlbums: data => dispatch(getAlbums(data)),
  }
}
const mapStateToProps = state => {
  return {
    artists: state.artists,
    albums: state.albums
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
