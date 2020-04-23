import React from 'react';
import Exercise from './Exercise'
import Clock from './Clock'

class News extends React.Component {


  render(){
      return (
          <div>
            <h1>News</h1>
              <Clock />
              <Exercise/>
          </div>
      )
  }
}

export default News