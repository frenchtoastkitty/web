import React from 'react';
import Game from './Game';
import getWeb3 from './getWeb3';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      kittyID: null,
      kittyData: null,
      playerHasInfo: false,
      inValidKittyFlag: false
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount = async () => {
    // torus injection
    const script = document.createElement("script");
    script.src = "https://app.tor.us/embed.min.js";
    script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    this.setState({web3: await getWeb3()});
  }

  inputOnChange(e) {
    this.setState({kittyID: e.target.value});
  }

  onFormSubmit = async(e) => {
    e.preventDefault();
    if (this.state.web3 && this.state.web3.eth.accounts[0] && this.state.kittyID) {
      await fetch(`https://public.api.cryptokitties.co/v1/kitties?kittyId=${this.state.kittyID}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-token' : 'YwwxK5v49F-A10kiLNZN5Mp-VI5pc-1vHBRljHskN5w'
        }
      }).then(response => {
        return (response.status === 200) ? response.json() : null
      }).then((json) => {
        if (json && json.kitties.length) {
          this.setState({
            playerHasInfo: true, 
            kittyData: json.kitties[0],
            inValidKittyFlag: false
          });
          console.log(this.state.kittyData)
        } else {
          this.setState({inValidKittyFlag: true})
        }
      });
    }
  }

  render() {
    if (this.state.playerHasInfo) {
      return <Game kitty={this.state.kittyData}/>;
    } else {
      return (
        <div>
          <h1>FRENCH TOAST KITTY</h1>
          <form onSubmit={this.onFormSubmit}>
            <span>Kitty Id: <input onChange={this.inputOnChange} type="text"/></span>
            <button type="submit">Start</button>
            {this.state.inValidKittyFlag && <p style={{color: 'red'}}>not a valid kitty id</p>}
          </form>
          <p>click the bottom button to login</p>
          {this.state.web3 && this.state.web3.eth.accounts[0] && <p>web3 has loaded</p>}
        </div>
       );
    }
  }
}

export default App;
