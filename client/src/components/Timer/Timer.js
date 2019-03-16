import React, { Component } from 'react';
import { Link } from "react-router-dom";


const formattedMinutes = (min) =>
   Math.floor(min / 60) +
    ':' +
  ('0' + min % 60).slice(-2)
  
    

// This 
class CountdownTimer extends Component {

      constructor(props) {
        super(props)


        this.state = {
          minutesElapsed: 0,
          lastClearedIncrementer: null
        }
        this.incrementer = null;

      }
        
      // start button
      handleStartClick() {
        this.incrementer = setInterval( () => 
        this.setState({minutesElapsed: this.state.minutesElapsed + 1
            }), 5000);
        
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
          minutesElapsed: 0,
        
        })
      }

       
      render() {
        return(

        <div className="ui card">
          <div className="content">
            <div className="header">
              Timer
            </div>
            <div className="meta">
              <h1 id="timer">{formattedMinutes(this.state.minutesElapsed)}</h1>          
            </div>
            </div>

            <div className="content">
              
                 <button className="ui button" onClick={this.handleStartClick.bind(this)}>start</button>
                 <button className="ui button" onClick={this.handleStopClick.bind(this)}>stop</button>
                 <button className="ui button" onClick={this.handleResetClick.bind(this)}>reset</button>
                 </div>
            
        </div> 
        
        )
      }
}
      
      


export default CountdownTimer;