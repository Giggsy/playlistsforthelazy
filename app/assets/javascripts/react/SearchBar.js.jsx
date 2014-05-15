/**
 * @jsx React.DOM
 */
var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.searchSubreddit.getDOMNode().value
    );
  },
  getTracks: function() {
    this.props.updateTracks(
      this.refs.searchSubreddit.getDOMNode().value
    );
    return false;
  },
  render: function() {
    return(
      <form onSubmit={this.getTracks}>
        <input type="text" 
          placeholder="Subreddit" 
          value={this.props.subreddit}
          ref="searchSubreddit"
          onChange={this.handleChange}
          id="subreddit-search-bar"
          className="search-bar"/>
      </form> 
    );
  }
})

