require 'sinatra'
require 'shotgun' #A plugin that automatically restarts the sinatra server
				  #whenever we make changes


set :port, 2020   #This line makes the server use the port: 2020


get '/' do	#The root for our website
  erb :index 
end
