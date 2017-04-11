class FSRecord
  MODEL_NAME = ''
  attr_accessor :content, :model_name

  def initialize(file_data)
    results = file_data.match(/(---.+---)(.*)/m)
    meta_data = results[1]
    @content = results[2]

    lines = meta_data.split("\n")

    @meta = Hash.new

    lines.each do | line |
      if (line.strip != "---")
        results = line.match(/(.+):(.+*)/)
        key = results[1].strip

        self.create_attr(key)
        self.send("#{key}=", results[2].strip)
      end
    end
  end

  def create_method( name, &block )
    self.class.send( :define_method, name, &block )
  end

  def create_attr( name )
    create_method( "#{name}=".to_sym ) { |val|
      instance_variable_set( "@" + name, val)
    }

    create_method( name.to_sym ) { 
      instance_variable_get( "@" + name ) 
    }
  end

  def init

  end

  def self.model_name
    return ''
  end

  def self.all
    files = Dir.glob("#{Rails.root}/content/" + self.model_name + "/*")

    models = Array.new

    files.each do | file |
      data = File.read(file)
      Rails.logger.debug data
      models << self.new(data)
    end

    return models
  end 

  def get_file(file_name)
    files = Dir.glob("#{Rails.root}/content/blog/*")

    meta_data = ''
    data = ''

    files.each do | file |
      data = '';
      
      if (file == "/vagrant/rodrigovargas.me/content/blog/" + file_name + ".md")
        data = File.read(file)
        break
      else
        continue
      end
    end

    return data
  end
end