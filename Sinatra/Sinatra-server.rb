require 'sinatra'
require 'shotgun'


set :port, 2020   #This line makes the server use the port: 2020


get '/' do
  erb :index
end
