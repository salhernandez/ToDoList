function removeItem(idToDelete) {
  this.setState((prevState) => {
    const { items } = prevState;
    const filteredItems = items.filter((item) => item.id !== idToDelete);
    return {
      ...prevState,
      items: filteredItems
    };
  });
}

export { removeItem }; // a list of exported variables
