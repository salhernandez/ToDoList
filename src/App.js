import "./styles.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      newItem: value
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
              // need to have a key so that VDOM knows what to re-render
              <div key={`item-${index}`} className="row">
                <div className="col-md-3">
                  <input id={1} type="checkbox" />
                </div>
                <div className="col-md-3">
                  <img src={item.imageURL} alt="Logo" />
                </div>
                <div className="col-md-3">
                  <label htmlFor={1}>{item.label}</label>
                </div>
                <div className="col-md-3">
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
