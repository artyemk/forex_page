from flask import Flask, render_template, request, redirect, session, jsonify, make_response
import uuid

app = Flask(__name__,static_url_path='',static_folder='')
app.secret_key = 'the random string'

@app.route("/blackrock_wolfram")
def home():
    return render_template('blackrock-vows-to-support-more-shareholder-votes-on-climate-change-11607626325049b.html')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5100)
