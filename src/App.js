import "./styles.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      newItem: value
    });
  }

  handleCheckboxChange(id) {
    // code to update checkbox based on ID
    this.setState((prevState) => {
      const { items } = prevState;
      let updatedItems = [...items];
      const indexToUpdate = updatedItems.findIndex((item) => item.id === id);
      updatedItems[indexToUpdate] = {
        ...updatedItems[indexToUpdate],
        isChecked: !updatedItems[indexToUpdate].isChecked
      };
      return {
        ...prevState,
        items: updatedItems
      };
    });
  }

  removeItem(idToDelete) {
    this.setState((prevState) => {
      const { items } = prevState;
      const filteredItems = items.filter((item) => item.id !== idToDelete);
      return {
        ...prevState,
        items: filteredItems
      };
    });
  }

  addItem() {
    // fetch picture
    fetch("https://picsum.photos/50")
      .then((response) => {
        // do something with the response

        // needs to be bounded to constructor otherwise an error will be thrown
        this.setState((previousState) => {
          // make a copy of the data
          let itemsCopy = [...previousState.items];
          // add new item
          itemsCopy.push({
            id: uuidv4(),
            label: previousState.newItem,
            imageURL: response.url,
            isChecked: false
          });

          return {
            items: itemsCopy,
            // reset input box
            newItem: ""
          };
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  render() {
    return (
      <div className="App container">
        <h1>To-Do</h1>

        <div className="grid">
          <div className="row">
            <div className="col" />
            <div className="col-6">
              <input
                type="text"
                value={this.state.newItem}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <button onClick={this.addItem}>Add Item</button>
            </div>
          </div>

          {this.state.items.map((item, index) => {
            return (
              <ItemComponent
                label={item.label}
                imageURL={item.imageURL}
                key={`item-${index}`}
                isChecked={item.isChecked}
                handleChange={this.handleCheckboxChange}
                removeItem={this.removeItem}
                id={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class ItemComponent extends React.Component {
  render() {
    return (
      // need to have a key so that VDOM knows what to re-render
      <div className="row">
        <div className="col-md-3">
          <input
            type="checkbox"
            checked={this.props.isChecked}
            onChange={(event) => this.props.handleChange(this.props.id)}
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

export default App;
