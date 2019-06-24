import React from 'react'
import { connect } from 'react-redux';

class TopAlbums extends React.Component {

  render() {
    return (
      <div>
        <h3>Top Albums</h3>
        <ol>
          {this.props.albums.map(item =>
            <li>{`${item.name}(${item.count})`}</li>
          )}
        </ol>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    artists: state.artists,
    albums: state.albums
  }
}

export default connect(mapStateToProps)(TopAlbums)