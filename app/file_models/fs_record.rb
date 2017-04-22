 class FSRecord
  MODEL_NAME = ''
  attr_accessor :body, :model_name, :file_path

  def initialize path
    @model_name = model_name
    if (File.file?(path))
      self.file_initialize(path)
    else
      self.directory_initialize(path)
    end
  end

  def file_initialize file_path
    file_data = File.read(file_path)

    create_properties_from_file_data(file_data)    
  end

  def create_properties_from_file_data (file_data)
    results = file_data.match(/(---.+---)(.*)/m)
    meta_data = results[1]
    @body = results[2]
    @file_path = file_path

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

  def directory_initialize dir_path
    meta_file_data = File.read(dir_path + '/_meta.md')

    create_properties_from_file_data(meta_file_data)

    paths = Dir.glob(dir_path + "/*")

    paths.each do | path |
      extn = File.extname  path
      name = File.basename path, extn
      if (name != "_meta")
        self.create_attr(name)
        self.send("#{name}=", File.read(path))
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

  def content (locale)
    if (self.send(locale))
      return self.send(locale)
    else
      return self.body
    end
  end

  def self.all
    paths = Dir.glob("#{Rails.root}/content/" + self.model_name + "/*")

    models = Array.new

    paths.each do | path |
      models << self.new(path)
    end

    return models
  end

  def self.where(query)
    @items = self.all
    @filtered_items = Array.new

    key = ''
    value = ''

    query.map { | k, v | 
      key = k
      value = v
    }

    @items.each do | item |
      if (item.send(key) == value)
        @filtered_items << item
      end
    end

    return @filtered_items
  end

  def self.find(file_name)
    path = "#{Rails.root}/content/#{self.model_name}/#{file_name}"

    if (File.exists?(path))
      return self.new(path)
    end
  end
end