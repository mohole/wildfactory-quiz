'use strict';

import React from 'react';
import Questions from './questions';


export default class Quiz extends React.Component {
  constructor(){
    super();

    console.log('quiz presente!')
  }

  render(){
    return (
      <section>
        <Questions />
      </section>
    )
  }
}
