

// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var startYear = 0;
var endYear = 0;

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";



// Helper Functions (in this case the only one is runQuery)
const helpers = {

  runQuery: (topic, startYear, endYear) => {

	  var queryURL = queryURLBase + topic;

	  // If the user provides a startYear -- the startYear will be included in the queryURL
 	 if (parseInt(startYear)) {
    	queryURL = queryURL + "&begin_date=" + startYear + "0101";
  	  }

	  // If the user provides a startYear -- the endYear will be included in the queryURL
	  if (parseInt(endYear)) {
	    queryURL = queryURL + "&end_date=" + endYear + "0101";
	  }


    return axios.get(queryURL).then((response) => {
    	//filter only 5 articles
    	var result = [];
    	for(var i = 0;i<5 && i < response.data.response.docs.length;i++) {
    		result.push(response.data.response.docs[i])
    	}
	    return result;
    });

  },

  saveArticle: (article) => {
	  var queryURL = '/api/saved'	
	   return axios.post(queryURL, article).then((response) => {
    	return 1;
	  });

  },

   removeArticle: (id) => {
	  var queryURL = '/api/saved/' + id	
	   console.log('removing + ' + queryURL)
	  return axios.delete(queryURL).then((response) => {
    	return 1;
	  });

  },

  listArticles: () => {
 	var queryURL  = 'api/saved'
	return axios.get(queryURL).then((response) => {
    	console.log(response);
    	return response.data;
    });
  },

  excludeItemAtIndex: (items, exlusionIndex) => {
  	 var result = [];
  	 for(var i = 0;i<items.length;i++) {
  	 	if(i == exlusionIndex) {
  	 		continue;
  	 	}
  	 	result.push(items[i]);
  	 }
  	 return result;
  }


};

// We export the helpers function (which contains getGithubInfo)
export default helpers;

