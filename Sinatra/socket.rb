require 'socket'

socket = TCPServer.open(1111)

client = socket.accept
while msg = client.gets
  p msg

end
client.write("HTTP/1.1 101 Switching Protocols");
client.write("Upgrade: websocket");
client.write("Connection: Upgrade");
client.write("Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=");
client.write("Sec-WebSocket-Protocol: protocolOne")
socket.close