/**
 * @jsx React.DOM
 */

var ArchiveRow = React.createClass({
  handleClick: function() {
    this.props.getArchivedPlaylistTracks(this.props.playlist.id);
  },
  render: function() {
    var name = "r/" + this.props.playlist.subreddit;
    var createdAt = moment(this.props.playlist.created_at).fromNow();
    return (
      <li onClick={this.handleClick}>
        <h4>{name}</h4>
        <em>created {createdAt}</em>
      </li>
    );
  }

});
