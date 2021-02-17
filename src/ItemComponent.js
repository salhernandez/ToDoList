import React from "react";

/**
 * Presentational Component
 * Does not manage state
 */
class ItemComponent extends React.Component {
  render() {
    return (
      // need to have a key so that VDOM knows what to re-render
      <div className="row">
        <div className="col-md-3">
          <input
            type="checkbox"
            checked={this.props.isChecked}
            onChange={() => this.props.handleChange(this.props.id)}
          />
        </div>
        <div className="col-md-3">
          <img src={this.props.imageURL} alt="Logo" />
        </div>
        <div className="col-md-3">
          <label>{this.props.label}</label>
        </div>
        <div className="col-md-3">
          <span onClick={() => this.props.removeItem(this.props.id)}>
            <i className="bi bi-x-circle" />
          </span>
        </div>
      </div>
    );
  }
}

export default ItemComponent;
