#!/usr/bin/env python3
"""Static dev server for the MFA front-end clone.

Unlike `python -m http.server`, this disables caching so edits to
site.js / styles.css / *.html are always picked up on a normal reload.
(Plain http.server sends only Last-Modified and no Cache-Control, so
browsers heuristically cache the JS/CSS and keep running stale code —
which made the missions search and region filters look "broken" after
updates.)

Usage:
    python serve.py [port]      # default port 8123
"""
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
    print("Serving (no-cache) on http://localhost:%d  — Ctrl+C to stop" % port)
    # ThreadingHTTPServer so parallel asset requests (e.g. the 108 mission
    # flags) don't stall a single-threaded server.
    ThreadingHTTPServer(("", port), NoCacheHandler).serve_forever()
