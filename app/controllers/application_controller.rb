class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def hello
	render html: "Look at me, having an actual website. Rails tutorial is going great, Timothy."
	end
end
