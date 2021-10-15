import React, { Component } from "react"

class AddNewTradeSuccessAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    }
  }

  componentDidMount() {
    const self = this;
    setTimeout(() => {
      self.setState({ isOpen: false });
    }, this.props.alertDurationInSeconds || 5000);
  }

  render() {
    if (!this.state.isOpen) return null;    

    return (
      <div class="w-1/4 mx-auto fixed bottom-0 mb-3 mr-3">
        <div class="flex p-5 rounded-lg shadow-lg bg-white">
        <div>
          <svg class="w-6 h-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
        </div>
        <div class="ml-3">
          <h2 class="font-semibold text-gray-800">Success!</h2>
          <p class="mt-2 text-sm text-gray-600 leading-relaxed">New trade log has been created</p>
        </div>
        </div>
      </div>
    )

  }
}

export default AddNewTradeSuccessAlert;