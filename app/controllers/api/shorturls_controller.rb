class Api::ShorturlsController < Api::ApiController
  PREPAGE = 50

  def index
    get_shorturls_and_job_done
    @action = request.original_url.split('/')[-1]
  end

  def create
    job_ck = current_user.shorturl_job_checks.create
    url = params[:url_string].to_s
    CreateGooGlWorker.perform_async(current_user.id, job_ck.id, url)

    @job_done_check = job_done?
    render 'api/shorturls/index'
  end

  def get_new
    get_shorturls_and_job_done
    render 'api/shorturls/index'
  end

  private

  def job_done?
    current_user.shorturl_job_checks.job_done_check ? 'false' : 'true'
  end

  def get_shorturls_and_job_done
    page = params_page_check(params)
    @shorturls = current_user.shorturls.page(page).per(PREPAGE).order(created_at: :desc)
    @job_done_check = job_done?
  end
end
