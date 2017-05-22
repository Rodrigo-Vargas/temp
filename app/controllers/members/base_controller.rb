class Members::BaseController < ApplicationController
  before_action :authenticate_admin_user!

  layout "members"
end
