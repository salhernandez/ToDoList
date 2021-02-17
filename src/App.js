import "./styles.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { removeItem } from "./utilities";
import ItemComponent from "./ItemComponent";

class App extends React.Component {
  constructor(props) {
    super(props);

    // starting values
    this.state = {
      newItem: "",
      items: []
    };

    // bounded functions
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    // utilities
    this.removeItem = removeItem.bind(this);
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

  showAddTask() {
    // contains JSX
    var showAddButton = (
      <div className="col">
        <button onClick={this.addItem}>Add Item</button>
      </div>
    );

    return (
      <div className="row">
        <div className="col" />
        <div className="col-6">
          <input
            type="text"
            value={this.state.newItem}
            onChange={this.handleChange}
          />
        </div>
        {/* add button as a variable */}
        {showAddButton}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>To-Do</h1>

        <div className="grid">
          {/* first row */}
          {this.showAddTask()}

          {/* generate rows based on array contents */}
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

export default App;
