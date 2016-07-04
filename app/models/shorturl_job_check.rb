class ShorturlJobCheck < ApplicationRecord
  belongs_to :users

  before_create do
    self.job_done = 0
  end

  def self.job_done_check
    where(job_done: 0).count > 0
  end
end
