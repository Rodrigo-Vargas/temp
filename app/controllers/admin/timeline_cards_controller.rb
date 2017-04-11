class Admin::TimelineCardsController < Admin::BaseController
  def index
    @cards = TimelineCard.all
  end
  
  def new
    @timeline_card = TimelineCard.new
  end

  def edit
    @timeline_card = TimelineCard.find(params[:id])
  end

  def create
    @timeline_card = TimelineCard.new(timeline_card_params)

    respond_to do |format|
      if @timeline_card.save
        format.html { redirect_to admin_timeline_cards_path, notice: 'Card created successfully.' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    @timeline_card = TimelineCard.find(params[:id])
    respond_to do |format|
      if @timeline_card.update(timeline_card_params)
        format.html { redirect_to admin_timeline_cards_path, notice: 'Card updated successfully.' }
      else
        format.html { render :edit }
      end
    end
  end

  def get_from_disk
    files = Dir.glob("#{Rails.root}/content/cards/*")

    meta_data = ''
    data = ''

    files.each do | file |
      data = File.read(file)

      meta_data = data.match(/(---.+---)/m)[0]
    end

    lines = meta_data.split("\n")

    meta = Hash.new

    lines.each do | line |
      if (line != "---")
        results = line.match(/(.+)\s*:\s*(\S+)/)
        logger.debug results
        key = results[0]
        meta[key] = results[1]
      end
    end

    render json: meta
  end

  private
    def timeline_card_params
      params.require(:timeline_card).permit(:body,
                                            :name,
                                            :slug,
                                            :start_date,
                                            :end_date,
                                            :job_title,
                                            :locale)
    end
end
