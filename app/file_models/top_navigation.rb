class TopNavigation < FSRecord
  MODEL_NAME = 'top_navigations'
   
  def initialize path
    super(path) 
  end

  def self.model_name
    return MODEL_NAME
  end
end