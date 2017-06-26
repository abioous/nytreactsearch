// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Search = React.createClass({
  
   // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { topic: "", startYear:"", endYear:"" };
  },

 // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setSearch(this.state.topic, this.state.startYear, this.state.endYear);
    this.setState({ topic: this.state.topic,startYear: this.state.startYear,  endYear: this.state.endYear });
  },


  render: function() {
    return (
      <div className="container">

        <div className="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Article search</h3>
            </div>

            <div className="panel-body">
            <form onSubmit={this.handleSubmit} className="form-horizontal text-center">
              <div className="form-group">
                <label for="topic">Topic</label>
                <input type="text" className="form-control" id="topic" placeholder="Topic"/>
              </div>
              <div className="form-group">
                <label for="startYear">Start Year</label>
                <input type="text" className="form-control" id="startYear" placeholder="Start Year"/>
              </div>
              <div className="form-group">
                <label for="endYear">End Year</label>
                <input type="text" className="form-control" id="endYear" placeholder="End Year"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
