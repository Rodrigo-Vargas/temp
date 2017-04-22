class Course < FSRecord
  MODEL_NAME = 'courses'
   
  def initialize path
    super(path) 
  end

  def self.model_name
    return MODEL_NAME
  end
end