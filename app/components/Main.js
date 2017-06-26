// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { topic: "", startYear: "", endYear:"", search: [] };
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    console.log(this.state.search.topic);
    console.log(this.state.search.startYear);
    console.log(this.state.search.endYear);
    

  },

 // This function allows childrens to update the parent.
  setSearch: function(topic, startYear, endYear) {
    this.setState({'search': { 'topic':topic, 'startYear':startYear, 'endYear':endYear}});
  },

  // Here we render the function
  render: function() {

    return (

      <div className="container">
        <div className="jumbotron">
          <h2><strong>New Your Times Article Scrubber</strong></h2>
          <p><em>Search for and annotate articles of interest. <hr /></em></p>
          <p>
            <Link to="/Search" setSearch={this.setSearch}><button className="btn btn-primary btn-lg">Search</button></Link>
            <Link to="/Saved"><button className="btn btn-danger btn-lg">Saved Articles</button></Link>
          </p>
        </div>
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
