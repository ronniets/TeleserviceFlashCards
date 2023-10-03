from flask import Flask, render_template
from model import database as db
import json

app = Flask(__name__)

def get_database():
    try:
        return db.Database()
    except Exception as e:
        return e

def get_data():
    try:
        db = get_database()
        test_data = db.get_questions()
        return test_data
    except Exception as e:
        return e

@app.route('/')
def get_start():
    try:
        return render_template('start.html')
    except Exception as e:
        return e

@app.route('/session')
def get_session():
    try:
        question_list = get_data()
        return render_template('session.html', question_list=json.dumps(question_list))
    except Exception as e:
        return e
    
if __name__ == "__main__":
    app.run(debug=True)