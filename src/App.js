import React, { Component } from 'react';
import './App.css';
import Game from './Game';
import i18n from './i18n'

class App extends Component {
      

  constructor(props) {
      super(props);
      var language = window.navigator.userLanguage || window.navigator.language;
      console.log(language);
      var selected = 'en';
      if (language === 'fr'){
        selected = language;
      }

      this.state = {
          lang : i18n[selected]
      };
  
  };

  changeLanguage(e){
    var lang = e.target.value
    if (lang!=='0'){
      this.setState({lang : {}});
      this.setState({lang : i18n[lang]});
    }
  }

  render() {

    return (
      <div className="App">
        <Game i18n={this.state.lang} changeLanguage={this.changeLanguage.bind(this)} />
      </div>
    );
  }
}

export default App;
