import React, {Component} from "react";
import Query from "./Query";
import Saved from "./Search";
import helpers from "../utils/helpers";


class Main extends Component {

  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

  _setSearchFeilds: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  componentDidMount: function() {

    // Hit the Mongo API to get saved articles
    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));

  },

  componentDidUpdate: function(prevProps, prevState) {

    if(this.state.searchTerms != prevState.searchTerms)
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        this.setState({ apiResults: data });
      }.bind(this));
    }

  },

  render: function() {
    return (

      <div className="container">

        <div className="page-header">
          <h1 className="text-center"></h1>
          <h2 className="text-center">Searchy Searchy</h2>
        </div>

        <Query _setSearchFeilds={this._setSearchFeilds} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>

    );
  }
};

module.exports = Main;
