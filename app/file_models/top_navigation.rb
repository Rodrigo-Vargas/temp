class TopNavigation < FSRecord
   model_name = 'top_navigations'
   
   def initialize file
      super(file) 
   end
   
   def self.model_name
     return 'top_navigations'
   end
end