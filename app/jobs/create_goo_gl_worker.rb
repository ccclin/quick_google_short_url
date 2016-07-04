class CreateGooGlWorker
  include Sidekiq::Worker
  def perform(user_id, job_check_id, urls)
    user = User.find(user_id)
    google_api_key = user.google_api_key.key
    urls.split("\n").each do |url|
      if url.present? && user.shorturls.find_by(url: url).blank?
        goo_url = GoogleUrlshortenerService.new(google_api_key, url).google_url_id
        shurl = user.shorturls.new({url: url, goo_url: goo_url})
        shurl.save
        sleep(1)
      end
    end
    job_check = user.shorturl_job_checks.find(job_check_id)
    job_check.job_done = 1
    job_check.save
  end
end
