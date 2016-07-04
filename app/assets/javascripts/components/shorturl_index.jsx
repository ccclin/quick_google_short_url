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

  componentDidMount: function() {
    var copy_id = "to_copy_" + this.props.shorturl_id;
    var short_id = "short_url_" + this.props.shorturl_id;
    var raw_url_id = "raw_url_" + this.props.shorturl_id;
    document.getElementById(copy_id).addEventListener("click", function() {
      copyToClipboard(document.getElementById(short_id));
    });
    $('#' + raw_url_id).tooltip({
      'selector': '',
      'container':'body'
    });
  },

  render: function() {
    var url = this.props.data;
    var shorturl_id = this.props.shorturl_id;
    return (
      <tr>
        <td className="url"><a id={"raw_url_" + shorturl_id} href={url.raw_url} data-toggle="tooltip" data-placement="top-left" title={url.raw_url}>{url.raw_url}</a></td>
        <td className="goo-url">
          <a href={url.goo_url} id={"short_url_" + shorturl_id} >{url.goo_url}</a>
          <a href="javascript:void(0)" id={"to_copy_" + shorturl_id} className="btn btn-link"><i className="fa fa-clipboard"></i></a>
        </td>
      </tr>
    );
  }
});

var ShorturlIndex = React.createClass({
  getInitialState: function () {
    return {
      current_page: 0,
      total_pages: 0,
      next_page: 0,
      shorturls: [],
      action: '',
      job_done: 'true'
    };
  },

  loadPage: function(url) {
    $.get(url, function(result) {
      var lastGist = result;
      if (this.isMounted()) {
        var new_shorturls = typeof this.state.shorturls[0] !== 'undefined' && this.state.shorturls[0] !== null ? React.addons.update(this.state.shorturls, {$push: lastGist.shorturls}) : lastGist.shorturls;
        this.setState({
          current_page: lastGist.paging.current_page,
          next_page: lastGist.paging.current_page + 1,
          total_pages: lastGist.paging.total_pages,
          shorturls: new_shorturls,
          action: lastGist.action,
          job_done: lastGist.job_done
        });
      }
    }.bind(this));
  },

  autoLoadPage: function(url) {
    $.get(url, function(result) {
      var lastGist = result;
      if (this.isMounted()) {
        this.setState({
          current_page: lastGist.paging.current_page,
          next_page: lastGist.paging.current_page + 1,
          total_pages: lastGist.paging.total_pages,
          shorturls: lastGist.shorturls,
          job_done: lastGist.job_done
        });
      }
    }.bind(this));
  },

  tick: function() {
    if (this.state.job_done === 'false') {
      var url = "/api/shorturls/get_new";
      console.log(url);
      this.autoLoadPage(url);
    }
  },

  componentDidMount: function() {
    this.loadPage(this.props.source);
    document.title = "QuickGoogleShortUrl";
    window.addEventListener('scroll', this.handleScroll);
    this.interval = setInterval(this.tick, 5000);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  handleScroll: function(event) {
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    if (scrollBottom == 0 && this.state.current_page < this.state.total_pages) {
      this.handlePageChanged();
    }
  },

  handlePageChanged: function(){
    var url = "/api/shorturls?page=" + this.state.next_page + "&total=" + this.state.total_pages;
    this.loadPage(url);
  },

  handleCreateSubmit: function(comment) {
    $.ajax({
      url: "/api/shorturls/",
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(result) {
        var lastGist = result;
        this.setState({
          job_done: lastGist.job_done
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
    var rows = [];
    for (var i=0; i < this.state.shorturls.length; i++) {
      rows.push(
        <ShorturlsListItem
          key={i}
          data={this.state.shorturls[i]}
          shorturl_id={i}
        />
      );
    }

    return (
      <div>
        <Navbar
          action={this.state.action}
        />
        <div className="container-fluid">
          <div className="col-md-8 col-sm-8 col-xs-7">
            <div className="table-responsive">
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
      </div>
    );
  }
});
