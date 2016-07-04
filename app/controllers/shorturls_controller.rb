class ShorturlsController < ApplicationController
  def index
    redirect_to api_key_path and return unless current_user.google_api_key.try(:key).try(:present?)
  end
end
