// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

// Helper Function
import helpers from "./utils/helpers";
import SocketIOClient from 'socket.io-client';




var Search = React.createClass({
  
   // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return {
           articles:[], 
           topic:"",
           startYear:"", 
           endYear:"", 
           socket: SocketIOClient('http://localhost:8080')
      };
  },


  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },


  addAricle: function(event) {
    var articleIndex = event.target.getAttribute('data-article-index');
    var article = this.state.articles[articleIndex]
    console.log(article);
    helpers.saveArticle({
        'Title':article.headline.main,
        'Link': article.web_url,
        'Comment': article.snippet
    }).then((articles) => {
        this.state.socket.emit('article-saved', article.headline.main);
        this.setState({'articles': helpers.excludeItemAtIndex(this.state.articles, articleIndex)})
    });



  },

 // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    //check if any field is empty then terminate
    if(!this.state.topic) {
        return
    }

    if(!this.state.startYear) {
        this.state.startYear = 2010;
    }

    if(!this.state.endYear) {
        this.state.endYear = 2018;
    }


    helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then((articles) => {
        if (articles !== this.state.articles) {
            this.setState({ articles: articles, topic:"", startYear:"", endYear:""});
        }
    });

  },

  rednerMatchedArticles: function() {
     const articles = this.state.articles;
      var articleCounter = 0;
      const listItems = articles.map((article) =>
          <li>
             <h3 className="articleHeadline text-left"><strong>{article.headline.main}</strong><span className="pull-right"><button data-article-index={articleCounter++} onClick={this.addAricle}>Save</button></span></h3>
        </li>
      );
    return (

     <div className="container  text-left">
         <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Matched Articels</h3>
        </div>
         <div className="panel-body text-center">
            <ul className="list-unstyled">{listItems}</ul>
          </div>
       </div>
      </div>

    );
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
                    <input type="text" className="form-control" id="topic" value={this.state.topic}  onChange={this.handleChange}  placeholder="Topic"/>
                  </div>
                  <div className="form-group">
                    <label for="startYear">Start Year</label>
                    <input type="text" className="form-control" id="startYear" value={this.state.startYear} onChange={this.handleChange} placeholder="Start Year"/>
                  </div>
                  <div className="form-group">
                    <label for="endYear">End Year</label> 
                    <input type="text" className="form-control" id="endYear" value={this.state.endYear} onChange={this.handleChange}   placeholder="End Year"/>
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
                </div>
              </div>
            </div>

            {this.rednerMatchedArticles()}

          </div>
        );
  }
});

module.exports = Search;
