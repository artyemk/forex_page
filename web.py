from flask import Flask, render_template, request, redirect, session, jsonify, make_response
from werkzeug.utils import secure_filename
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta, date

# db = MongoClient("mongodb://myuser:4kFNO7kgWcP8@127.0.0.1/yes").yes

app = Flask(__name__,static_url_path='',static_folder='')
app.secret_key = 'the random string'

@app.route("/")
def home():
    return render_template('fmain.html')


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)
