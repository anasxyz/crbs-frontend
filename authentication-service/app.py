from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/hello", methods=["GET"])
def hello():
  return jsonify({"message": "hello", "service": "authentication service"}), 200


if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=5000)
