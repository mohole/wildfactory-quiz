'use strict';

import React from 'react';
import Answers from './answers';

export default class Questions extends React.Component {
  constructor(){
    super();

    console.log('domande presente!')
  }

  render(){
    return (
      <section>
        <Answers />
      </section>
    )
  }
}
