import React from 'react'


class ItemCard extends React.Component {

  render() {
    return (
      <div>

        <div className="card">
          <div className="card-divider">
            {this.props.name}              </div>
          <div className="card-section">
            <h4>{this.props.degree}</h4>
            <p>{this.props.details}</p>
          </div>
        </div>

      </div>
    )
  }

}

export default ItemCard;