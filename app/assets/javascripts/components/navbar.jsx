var Navbar = React.createClass({
  render: function() {
    var row = [];

    if (this.props.action.indexOf( 'shorturls') >= 0){
      row.push(<li className="active" key="shorturls"><a href="/shorturls">縮網址 <span className="sr-only">(current)</span></a></li>);
    } else {
      row.push(<li key="shorturls"><a href="/shorturls">縮網址</a></li>);
    };

    if (this.props.action.indexOf('api_key') >= 0){
      row.push(<li className="active" key="api_key"><a href="/api_key">APIKey <span className="sr-only">(current)</span></a></li>);
    } else {
      row.push(<li key="api_key"><a href="/api_key">APIKey</a></li>);
    };

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {row}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">登出</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});