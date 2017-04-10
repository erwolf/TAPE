class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def hello
	render html: "hey, look, Emily's working ahead on rails!"
	end
end
