class Page < FSRecord
  MODEL_NAME = 'pages'
   
  def initialize path
    super(path) 
  end

  def self.model_name
    return MODEL_NAME
  end
end