# Import necessary libraries
from flask import Flask, jsonify, request
from flask_cors import CORS
from tools import *
import os, sys
sys.path.append(os.getcwd())
from prompts import *
from retrivers import *
from agents import *
app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = 'backendPython/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.json.get('question')
        message_history = request.json.get('messageHistory')
        agent.prev_summary = message_history
        print(user_input, message_history)
        if user_input:
            output = agent.run(user_input)
            new_message_history = agent.get_chat_summary()
            response_obj = [{
                "text": output,
                "messageHistory":new_message_history
            }]
            response_headers = {
                "Access-Control-Allow-Origin": "*"
            }
            return jsonify(response_obj), 200, response_headers
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/chatbotimage', methods=['POST'])
def chatbotimage():
    try:
        question = request.form.get('question')
        uploaded_file = request.files.get('file')

        if not question or not uploaded_file:
            return jsonify({"error": "Missing question or file"}), 400

        if uploaded_file:
            filename = os.path.join(
                app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            uploaded_file.save(filename)

        response_obj = [{
            "text": question,
            "file_name": uploaded_file.filename,
            "message": " File uploaded and saved successfully."
        }]

        response_headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return jsonify(response_obj), 200, response_headers
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


if __name__ == "__main__":
    agent = PersonalAgent(prev_summary='')
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(host="localhost", port=8501)
