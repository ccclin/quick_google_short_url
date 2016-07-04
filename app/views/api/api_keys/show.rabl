object false

node :google_api_key do
  { api_key: @google_api_key.key }
end

node :action do
  @action
end if @action
