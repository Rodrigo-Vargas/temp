class Card < FSRecord
  MODEL_NAME = 'cards'

  def initialize (path)
    super(path)
  end

  #def self.content(locale, slug)
  #  if File.exists?("#{Rails.root}/content/cards/content/#{locale}/#{slug}.md")
  #    return File.read("#{Rails.root}/content/cards/content/#{locale}/#{slug}.md")
  #  else
  #    return self.body
  #  end
  #end

  def self.model_name
    return MODEL_NAME
  end
end