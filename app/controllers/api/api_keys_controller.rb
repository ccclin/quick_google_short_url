class Api::ApiKeysController < Api::ApiController
  def show
    @google_api_key = current_user.google_api_key || current_user.build_google_api_key
    @action = get_action
    @action[:api_key][:active] = true
  end

  def update
    @google_api_key = current_user.google_api_key || current_user.build_google_api_key
    @google_api_key.key = params[:google_api_key].to_s
    @google_api_key.save

    render 'api/api_keys/show'
  end
end
