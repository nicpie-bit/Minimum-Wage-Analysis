from flask import Flask, jsonify, render_template
from os import environ
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URI')

db = SQLAlchemy(app)

class Wage(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)

@app.route('/')
def index():
    return "Wages"

@app.route('/api/wages/postgres')
def wage_postgres():
    wages = db.session.query(Wage)   
    data = []

    for wage in wages:
        data.append({
            "id": wage.id, 
            "content": wage.content
        }) 

    return jsonify(data)


if __name__ == '__main__':
     app.run(debug = True)



