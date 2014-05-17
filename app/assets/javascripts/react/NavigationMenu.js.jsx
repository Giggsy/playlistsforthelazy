/**
 * @jsx React.DOM
 */
var NavigationMenu = React.createClass({

  render: function() {
    var self = this;
    var navCategories = [];
    ['Tracks', 'Archives', 'Favorites'].map(function(navCategory) {
      var classString = "btn btn-default";
      if (self.props.currentlyShowing === navCategory) {
        classString += " active";
      }
      navCategories.push(
        <div className="btn-group">
          <button type="button" onClick={self.props.navSelector} className={classString}>{navCategory}</button>
        </div>
      );
    });
    return (
      <div className="btn-group btn-group-justified">
        {navCategories}
      </div>
      );
  }

});
