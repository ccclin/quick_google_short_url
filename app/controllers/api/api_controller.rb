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
end
