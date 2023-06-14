from flask import Flask, jsonify, render_template, request
import requests
import json, sys

sys.path.insert(0,'E:\\programs\\ai chatbot\\prepared')

from chatbot import predict_class, get_response

application = Flask(__name__)

intents = json.loads(open('intends.json').read())

@application.route('/')
def index():

    return render_template("index.html")

@application.route('/chat', methods=["POST"])
def chat():
     if request.form['message']:
        name = request.form['message']

        while True:
            message = name
            ints = predict_class(message)
            res = get_response(ints, intents)
            msg = {
                "answer" : res
            }

            return jsonify(msg)

if __name__ == '__main__':
    application.run(debug=True)