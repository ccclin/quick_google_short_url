require 'json'

class GoogleUrlshortenerService
  KEY = ENV['GOOGLE_KEY']

  def initialize(input_url)
    uri = URI('https://www.googleapis.com/urlshortener/v1/url')

    params = { longUrl: input_url }
    json_headers = { "Content-Type" => "application/json" }

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    http.read_timeout = 90
    @c = http.post("#{uri.path}?key=#{KEY}", params.to_json, json_headers)
  end

  def output_hash
    JSON.parse(@c.body)
  end

  def google_url_id
    output_hash["id"]
  end
end