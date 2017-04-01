class TimelineCard < ApplicationRecord

  def year
    self.start_date.strftime('%Y')
  end

  def period
    self.start_date.strftime('%Y')
  end
end
