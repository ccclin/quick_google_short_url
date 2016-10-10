var Navbar = React.createClass({
  render: function() {
    var row = [];

    for (action_key in this.props.action) {
      item = this.props.action[action_key];
      if (item.active) {
        row.push(<li className="active" key={item.id}><a href={item.url}>{item.title} <span className="sr-only">(current)</span></a></li>);
      } else {
        row.push(<li key={item.id}><a href={item.url}>{item.title}</a></li>);
      };
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
              <li><a href="/users/sign_out">登出</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
