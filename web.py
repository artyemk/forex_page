from flask import Flask, render_template, request, redirect, session, jsonify, make_response
from werkzeug.utils import secure_filename
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta, date
import uuid

db = MongoClient().forex

app = Flask(__name__,static_url_path='',static_folder='')
app.secret_key = 'the random string'

@app.route("/")
def home():
    return render_template('fmain.html', comments=db.comments.find(sort=[( '_id', DESCENDING )]))

@app.route("/insert_comment", methods=["POST"])
def insert_comment():
    print(request.form)
    db.comments.insert_one({ "date" : datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "id" : uuid.uuid4().hex, "name" : request.form.get('name'), "comment" : request.form.get('comment') })
    return redirect("/#addcomment")

@app.route("/delete_comment")
def delete_comment():
    comment_id = request.args.get('comment')
    db.comments.delete_one({"id" : comment_id})
    return redirect("/")

@app.route("/alter_comment", methods=["POST"])
def alter_comment():
    # if request.form.get('token') == "фыв"
    comment_id = request.args.get('comment')
    db.comments.update_one({"id" : comment_id}, {"$set" : {"comment" : request.form.get('comment')}})
    return redirect("/#addcomment")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)
