'use strict';

import React from 'react';
import Welcome from './welcome';
import Quiz from './quiz';
import Form from './form';
import Results from './results';
import Credits from './credits';

export default class App extends React.Component {
  constructor(){
    super();
    console.log('app presente!')
    this.state = {

    }
  }

  render(){
    return (
      <section>
        <Quiz />
        <Form />
        <Results />
        <Credits />
        <Welcome />
      </section>
    )
  }
}
