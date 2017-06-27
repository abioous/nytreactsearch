// Helper Function
import helpers from "./utils/helpers";

// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;



function formatDate(date) {
    if(!(date instanceof Date)) {
        date  = new Date(date);
    }
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}


var Saved = React.createClass({




   // Here we set a generic state associated with the text being searched for
  getInitialState: function() {

    helpers.listArticles().then((articles) => {
        this.setState({'articles':articles})
    })

    return {articles:[]};
  },


  removeAricle:function(event) {
    var articleIndex = event.target.getAttribute('data-article-index');
    var article = this.state.articles[articleIndex];
    helpers.removeArticle(article['_id']).then((data) => {
          this.setState({'articles': helpers.excludeItemAtIndex(this.state.articles, articleIndex)})
    })
  },


  render: function() {
     const articles = this.state.articles;
      var articleCounter = 0;
      const listItems = articles.map((article) =>
          <li>
             <h3 className="articleHeadline text-left"><a href="{article.link}"><strong>{article.title}</strong></a> <span>Date Saved: {formatDate(article.date)} </span><span className="pull-right"><button data-article-index={articleCounter++} onClick={this.removeAricle}>Remove</button></span></h3>
             <h5 className="text-left">{article.comment}</h5>
        </li>
      );
    return (

     <div className="container  text-left">
         <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articels</h3>
        </div>
         <div className="panel-body text-center">
            <ul className="list-unstyled">{listItems}</ul>
          </div>
       </div>
      </div>

    );
  }

});

module.exports = Saved;
