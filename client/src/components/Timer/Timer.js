import React, { Component } from 'react';
import { Link } from "react-router-dom";


const formattedSeconds = (sec) =>
   Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)
  
    

// This 
class Stopwatch extends Component {

      constructor(props) {
        super(props)


        this.state = {
          secondsElapsed: 0,
          lastClearedIncrementer: null
        }
        this.incrementer = null;

      }
          componentDidMount () {
          this.incrementer = setInterval( () => 
          this.setState({secondsElapsed: this.state.secondsElapsed + 1
              }), 500);
        }
      // start button
      handleStartClick() {
        this.incrementer = setInterval( () => 
        this.setState({secondsElapsed: this.state.secondsElapsed + 1
            }), 500);
        
      }

      handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
          lastCleared: this.incrementer
        })
      }

      handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
          secondsElapsed: 0,
        
        })
      }

       
      render() {
        return(

        <div className="ui card">
          <div className="content">
            <div className="header">
              Record
            </div>
            <div className="meta">
              <h1 id="timer">{formattedSeconds(this.state.secondsElapsed)}</h1>          
            </div>
            </div>
            <div className="content">
              
                 <button className="ui button" onClick={this.handleStartClick.bind(this)}>start</button>
                 <button className="ui button" onClick={this.handleStopClick.bind(this)}>stop</button>
                 <button className="ui button" onClick={this.handleResetClick.bind(this)}>reset</button>
                
              

            </div>
            <div className="content extra">
              
              <Link to="/">Back</Link>
            </div>
        </div>

        )
      }
}
      
      


export default Stopwatch;