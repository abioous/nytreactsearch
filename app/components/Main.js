// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

import SocketIOClient from 'socket.io-client';


//socket.on('channel-name', (message) => ... /* some logic */);



var Main = React.createClass({


  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
      var socket = SocketIOClient('http://localhost:8080')
        socket.on('article-saved', (message) => {
            console.log('New Article added')
            this.setState({"message":message})
        });

    return {
           message:"",
      };
  },


 renderMessage:function() {
    if(!this.state.message) {
        return (
            <span/>
          )
    }
    return (
      <h2>Added New Article: {this.state.message}</h2>
    )
 },

  // Here we render the function
  render: function() {

    return (

      <div className="container">
          <h2><strong>New Your Times Article Scrubber</strong></h2>
          <p><em>Search for and annotate articles of interest. <hr /></em></p>
          <p>
            <Link to="Search"><button className="btn btn-primary btn-lg">Search</button></Link>
            <Link to="Saved"><button className="btn btn-danger btn-lg">Saved Articles</button></Link>
          </p>
        {this.renderMessage()}  
        <div className="row">

          {/* This code will dump the correct Child Component */}
          {this.props.children}
        </div>


      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
