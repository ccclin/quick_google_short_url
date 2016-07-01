class Api::ShorturlsController < ApplicationController
  def index
    @shorturls = Shorturl.all
  end

  def create
    url = params[:url_string]
    if Shorturl.find_by(url: url).blank?
      goo_url = GoogleUrlshortenerService.new(url).google_url_id
      shurl = Shorturl.new({url: url, goo_url: goo_url})
      shurl.save
    end
    render 'api/shorturls/index'
  end
end
