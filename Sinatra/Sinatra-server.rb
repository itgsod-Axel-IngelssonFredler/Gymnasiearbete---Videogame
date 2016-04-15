require 'sinatra'
require 'shotgun' #A plugin that automatically restarts the sinatra server
				  #whenever we make changes


set :port, 2020   #This line makes the server use the port: 2020
#set :bind, '192.168.0.11'

get '/' do	#The root for our website
  erb :index
end

get '/about_us' do
  erb :about_us
end

get '/leaderboards' do
  erb :leaderboards
end

get '/media' do
  erb :media
end

get '/github' do
  erb :github
end