from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)


@app.route("/")
def home_page():
    example_embed = "Just Run In Console:"
    return render_template("index.html", embed=example_embed)


@app.route("/editdata/<data>/<account_id>/<new_balance>", methods=["GET", "POST"])
def data_get(data, account_id, new_balance):
    if request.method != "POST":
        with open("static/json/data.json") as f:
            data = json.load(f)
        for item in data["accounts"]:
            if item["id"] == account_id:
                item["balance"] = new_balance
        with open("static/json/data.json", "w") as f:
            json.dump(data, f)
        return data
    print(request.get_text())
    return "OK", 200


app.run(debug=True)