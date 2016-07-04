object false

if @shorturls
  node :shorturls do
    @shorturls.map do |url|
      { raw_url: url.url, goo_url: url.goo_url }
    end
  end

  node :paging do
    {
      total_pages: @shorturls.total_pages,
      current_page: @shorturls.current_page
    }
  end
end

node :job_done do
  @job_done_check
end

node :action do
  @action
end if @action
