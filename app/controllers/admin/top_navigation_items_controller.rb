class Admin::TopNavigationItemsController < Admin::BaseController
  def index
    @nav_items = TopNavigationItem.all.order(:position)
  end

  def new
    @top_nav_item = TopNavigationItem.new
  end

  def edit
    @top_nav_item = TopNavigationItem.find(params[:id])
  end

  def create
    @top_nav_item = TopNavigationItem.new(top_navigation_item_params)

    respond_to do |format|
      if @top_nav_item.save
        format.html { redirect_to admin_top_navigation_items_path, notice: 'Menu created successfully.' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    @top_nav_item = TopNavigationItem.find(params[:id])
    respond_to do |format|
      if @top_nav_item.update(top_navigation_item_params)
        format.html { redirect_to admin_top_navigation_items_path, notice: 'Menu updated successfully.' }
      else
        format.html { render :edit }
      end
    end
  end

  private
    def top_navigation_item_params
      params.require(:top_navigation_item).permit(:icon,
                                            :name,
                                            :locale,
                                            :position,
                                            :reference,
                                            :url)
    end
end
