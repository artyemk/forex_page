from flask import Flask, render_template, request, redirect, session, jsonify, make_response
from werkzeug.utils import secure_filename
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta, date
import uuid

# db = MongoClient().forex
# db = MongoClient("mongodb://forex:4kFNO7kgWcP8@127.0.0.1/forex").forex
db = MongoClient().forex

app = Flask(__name__,static_url_path='',static_folder='')
app.secret_key = 'the random string'

@app.route("/")
def root():
    return redirect("/wolframinvest")

@app.route("/wolframinvest")
def home():
    admin = ""
    if request.args.get("admin") == "0398daed503b4ca7a3833bafaa959611":
        admin = "true"
    return render_template('plusminus.html', comments=db.pluscomments.find(sort=[( '_id', DESCENDING )]), admin=admin)

@app.route("/insert_comment", methods=["POST"])
def insert_comment():
    print(request.form)
    db.pluscomments.insert_one({ "date" : datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "id" : uuid.uuid4().hex, "name" : request.form.get('name'), "comment" : request.form.get('comment') })
    return redirect("/")

@app.route("/delete_comment")
def delete_comment():
    comment_id = request.args.get('comment')
    db.pluscomments.delete_one({"id" : comment_id})
    return redirect("/")

@app.route("/alter_comment", methods=["POST"])
def alter_comment():
    # if request.form.get('token') == "фыв"
    comment_id = request.args.get('comment')
    db.pluscomments.update_one({"id" : comment_id}, {"$set" : {"comment" : request.form.get('comment')}})
    return redirect("/#addcomment")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5004)
