class Api::ApiController < ApplicationController
  private

  # 分頁用
  def params_page_check(params)
    case params[:page].to_s
    when 'next'
      params[:total].to_i
    when 'previous'
      1
    when ''
      1
    else
      params[:page].to_i
    end
  end

  def get_action
    {
      shorturls: { url: '/shorturls', id: 'shorturls', title: '縮網址' },
      api_key: { url: '/api_key', id: 'api_key', title: 'APIKey' }
    }
  end
end
