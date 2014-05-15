/**
 * @jsx React.DOM
 */


var ArchivesList = React.createClass({
  render: function() {
    console.log(2)
    var self = this;
    var rows = [];
    this.props.playlists.map(function (playlist, i) {
      rows.push(<ArchiveRow key={i}
                            playlist={playlist}
                            getArchivedPlaylistTracks={self.props.getArchivedPlaylistTracks}/>
               );
    });
    return (
      <div className="navigation">
        <ul>
          {rows}
        </ul>
      </div>
    );
  }

});
