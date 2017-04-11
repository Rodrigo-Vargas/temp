class Card < FSRecord
  model_name = 'cards'
  def initialize file
    super(file)
  end

  def self.model_name
    return 'cards'
  end
end