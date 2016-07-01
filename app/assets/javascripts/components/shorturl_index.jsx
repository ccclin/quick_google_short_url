var ShorturlsCreateForm = React.createClass({
  isBlank: function(obj){
    return(!obj || $.trim(obj) === "");
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var url_string = this.refs.url_string.value.trim();
    if (this.isBlank(url_string)) {
      alert('輸入不可為空');
    } else {
      this.props.onCreateSubmit({url_string: url_string});
      this.refs.url_string.value = "";
    }
    return;
  },
  render: function() {
    return (
      <form className="" onSubmit={this.handleSubmit}>
        <textarea className="form-control" ref="url_string" rows="25" />
        <span>請以Enter分離</span>
        <br/>
        <input type="submit" className="btn btn-primary" value="送出" />
      </form>
    );
  }
});

var ShorturlsListItem = React.createClass({
  render: function() {
    var url = this.props.data
    return (
      <tr>
        <td>{url.raw_url}</td>
        <td>{url.goo_url}</td>
      </tr>
    );
  }
});

var ShorturlIndex = React.createClass({
  getInitialState: function () {
    return {
      shorturls: []
    };
  },

  loadPage: function(url) {
    $.get(url, function(result) {
      var lastGist = result;
      if (this.isMounted()) {
        // var new_juds = typeof this.state.juds[0] !== 'undefined' && this.state.juds[0] !== null ? React.addons.update(this.state.juds, {$push: lastGist.juds}) : lastGist.juds;
        this.setState({
          shorturls: lastGist.shorturls
        });
      }
    }.bind(this));
  },

  componentDidMount: function() {
    this.loadPage(this.props.source);
    document.title = "QuickGoogleShortUrl";
  },

  handleCreateSubmit: function(comment) {
    $.ajax({
      url: "/api/shorturls/",
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(result) {
        alert('送出');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
    return
  },

  render: function() {
    var rows = [];
    for (var i=0; i < this.state.shorturls.length; i++) {
      rows.push(
        <ShorturlsListItem
          key={i}
          data={this.state.shorturls[i]}
        />
      );
    }

    return (
      <div className="container-fluid">
        <div className="col-md-8 col-sm-8 col-xs-7">
          <div className="table-responsive">
            <button type="button" className="btn btn-primary" onClick={() => this.loadPage(this.props.source)} >更新</button>
            <table id="shorturl_table" className="table table-hover">
              <thead>
                <tr>
                  <th>RAW URL</th>
                  <th>GOOGLE URL</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 col-xs-5">
          <div className="fixed">
            <div className="row">
              <div className="col-md-10 col-xs-10">
                <div className="row">
                  <h3>批次建立縮網址</h3>
                  <ShorturlsCreateForm
                    onCreateSubmit={this.handleCreateSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
