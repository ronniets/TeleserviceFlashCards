from flask import Flask, render_template
from model import database as db
import json

app = Flask(__name__)

##Gets the Database
def get_database():
    try:
        return db.Database()
    except Exception as e:
        return e

##Gets the list of questions from the Database
def get_data():
    try:
        db = get_database()
        return db.get_questions()
    except Exception as e:
        return e

##Routes the start page to the Localhost
@app.route('/')
def get_start():
    try:
        return render_template('start.html')
    except Exception as e:
        return e

##Routes the session page to HTTP and sends the list of questions as JSON to the page
@app.route('/session')
def get_session():
    try:
        question_list = get_data()
        return render_template('session.html', question_list=json.dumps(question_list))
    except Exception as e:
        return e
    
if __name__ == "__main__":
    app.run(debug=True)