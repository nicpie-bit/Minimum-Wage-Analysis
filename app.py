from flask import Flask, jsonify, render_template
from os import environ, stat_result
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URI')

db = SQLAlchemy(app)

class Wage(db.Model):
    Year = db.Column(db.Integer, primary_key = True)
    State = db.Cloumn(db.String)
    EffectiveMinimumWage = db.Column(db.Integer)
    FederalMinimumWage = db.Column(db.Integer)
    FederalMinimumWage2020Dollars = db.Column(db.Integer)
    EffectiveMinimumWage2020Dollars = db.Column(db.Integer)
    CPIAverage = db.Column(db.Integer)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/data.html')
def data():
    return render_template("data.html")

@app.route('/overview.html')
def overview():
    return render_template("overview.html")

@app.route('/about.html')
def about():
    return render_template("about.html")

@app.route('/api/wages/postgres')
def wage_postgres():
    wages = db.session.query(Wage)   
    data = []

    for wage in wages:
        data.append({
            "Year": wage.Year,
            "State": wage.State,
            "Effective.Minimum.Wage": wage.EffectiveMinimumWage,
            "Federal.Minimum.Wage": wage.FederalMinimumWage,
            "Federal.Minimum.Wage.2020.Dollars": wage.FederalMinimumWage2020Dollars,
            "Effective.Minimum.Wage.2020.Dollars": wage.EffectiveMinimumWage2020Dollars,
            "CPI.Average": wage.CPIAverage,
        })

    return jsonify(data)


if __name__ == '__main__':
     app.run(debug = True)



