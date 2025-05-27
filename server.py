# server.py
import http.server
import socketserver

PORT = 5000

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Serving at http://localhost:{PORT}")
httpd.serve_forever()
