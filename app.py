from flask import Flask, jsonify, render_template, request
import requests
import json, sys
import os

dir_path = os.getcwd()

sys.path.insert(0,f'{dir_path}\\prepared')

from chatbot import predict_class, get_response

app = Flask(__name__)

intents = json.loads(open('intends.json').read())

@app.route('/')
def index():

    return render_template("index.html")

@app.post('/chat')
def chat():
        name = request.get_json().get("message")

        while True:
            message = name
            ints = predict_class(message)
            res = get_response(ints, intents)
            msg = {
                "answer" : res
            }

            return jsonify(msg)

if __name__ == '__main__':
    app.run(debug=True)