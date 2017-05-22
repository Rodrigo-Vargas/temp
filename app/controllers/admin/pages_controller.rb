class Admin::PagesController < Admin::BaseController
  def home
  end

  def github
    Octokit.configure do |c|
      c.login = 'rodrigo-vargas'
      c.password = 'Rodrigo32'
    end

    # Fetch the current user
    @repositories = Octokit.repos
  end
end
