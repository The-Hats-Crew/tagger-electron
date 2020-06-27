import zerorpc
from tagger_fe import search

class TaggerMail(object):
    """Python class containing the method calls for application
    functionality.
    """
    def say_hello(self):
        return "Hello, World!"
    
    def do_search(self, search_string, path):
        res = search(search_string, path)
        return res.to_json()

def main():
    """Server configuration"""
    address = 'tcp://127.0.0.1:4242'
    server = zerorpc.Server(TaggerMail())
    server.bind(address)
    server.run()
    
if __name__ == "__main__":
    main()
