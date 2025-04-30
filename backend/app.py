from flask import Flask
from flask import request

#https://code.visualstudio.com/docs/python/tutorial-flask
#https://flask.palletsprojects.com/en/stable/quickstart/


app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route('/hello')
def hello():
    return 'Hello, World'
    