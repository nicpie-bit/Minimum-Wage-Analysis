from flask import Flask, jsonify, render_template
from os import environ, stat_result
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URI')

db = SQLAlchemy(app)

class Wage(db.Model):
    ID = db.Column(db.Integer, primary_key = True)
    Year = db.Column(db.Integer)
    State = db.Column(db.String)
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

@app.route('/index.html')
def home():
    return render_template("index.html")

@app.route('/api/states')
def get_states():
    states = db.session.query(Wage.State).distinct().all()
    data = [row[0] for row in states]
    return jsonify(data)




@app.route('/api/wages/<statename>')
def wage_postgres(statename):
    wages = db.session.query(Wage).filter_by(State = statename)   
    data = []

    for wage in wages:
        data.append({
            "ID": wage.ID,
            "Year": wage.Year,
            "State": wage.State,
            "EffectiveMinimumWage": wage.EffectiveMinimumWage,
            "FederalMinimumWage": wage.FederalMinimumWage,
            "FederalMinimumWage2020Dollars": wage.FederalMinimumWage2020Dollars,
            "EffectiveMinimumWage2020Dollars": wage.EffectiveMinimumWage2020Dollars,
            "CPIAverage": wage.CPIAverage,
        })

    return jsonify(data)


if __name__ == '__main__':
     app.run(debug = True)



