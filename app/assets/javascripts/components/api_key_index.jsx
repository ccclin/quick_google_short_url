var ApiKeyUpdateForm = React.createClass({
  isBlank: function(obj){
    return(!obj || $.trim(obj) === "");
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var google_api_key = this.refs.google_api_key.value.trim();
    if (this.isBlank(google_api_key)) {
      alert('輸入不可為空');
    } else {
      this.props.handleSubmit({google_api_key: google_api_key});
    }
    return;
  },
  render: function() {
    return (
      <form className="" onSubmit={this.handleSubmit}>
        <h1>Google Server Api Key</h1>
        <label htmlFor="google_api_key">Server Api Key</label>
        <input type="text" className="form-control" name="google_api_key" ref="google_api_key" value={this.props.google_api_key} onChange={this.props.onChange} />
        <br/>
        <input type="submit" className="btn btn-primary" value="送出" />
      </form>
    );
  }
});

var ApiKeyIndex = React.createClass({
  getInitialState: function () {
    return {
      google_api_key: '',
      action: ''
    };
  },

  loadPage: function(url) {
    $.get(url, function(result) {
      var lastGist = result;
      if (this.isMounted()) {
        this.setState({
          google_api_key: lastGist.google_api_key.api_key,
          action: lastGist.action
        });
      if (lastGist.google_api_key.api_key === '') {
        alert('請設定Google Api Key');
      };
      }
    }.bind(this));
  },

  componentDidMount: function() {
    this.loadPage(this.props.source);
    document.title = "QuickGoogleShortUrl";
  },

  _onChange: function (e) {
    var state = {},
        value;
    if(e.target.type == 'checkbox'){
      value = e.target.checked;
    }else if(e.target.type == 'radio'){
      if($.trim(e.target.value) == 'true'){
        value = true;
      }else if($.trim(e.target.value) == 'false'){
        value = false;
      }else{
        value = $.trim(e.target.value);
      }
    }else{
      value =  $.trim(e.target.value);
    }
    state[e.target.name] =  value;
    this.setState(state);
  },

  handleSubmit: function(comment) {
    $.ajax({
      url: "/api/api_key",
      dataType: 'json',
      type: 'PATCH',
      data: comment,
      success: function(result) {
        var lastGist = result;
        this.setState({
          google_api_key: lastGist.google_api_key.api_key
        });
        alert('送出');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
    return
  },

  render: function() {
    return (
      <div>
        <Navbar
          action={this.state.action}
        />
        <div className="container-fluid">
          <div className="col-md-6 col-sm-10 col-xs-12">
            <ApiKeyUpdateForm
              handleSubmit={this.handleSubmit}
              onChange={this._onChange}
              google_api_key={this.state.google_api_key}
            />
          </div>
        </div>
      </div>
    );
  }
});
