object false

node :shorturls do
  @shorturls.map do |url|
    { raw_url: url.url, goo_url: url.goo_url }
  end
end unless @shorturls.blank?
