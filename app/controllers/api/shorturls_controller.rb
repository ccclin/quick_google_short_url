class Api::ShorturlsController < ApplicationController
  def index
    @shorturls = current_user.shorturls
    @action = request.original_url.split('/')[-1]
  end

  def create
    url = params[:url_string]
    if current_user.shorturls.find_by(url: url).blank?
      goo_url = GoogleUrlshortenerService.new(url).google_url_id
      shurl = current_user.shorturls.new({url: url, goo_url: goo_url})
      shurl.save
    end
    render 'api/shorturls/index'
  end
end
