from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo

from openai import OpenAI
client = OpenAI(api_key = "")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:admin@harshcluster.axig8lp.mongodb.net/chatgpt-clone-db"
mongo = PyMongo(app)

@app.route('/')
def home():
    chats = mongo.db.chats.find({})
    myChats = [chat for chat in chats]
    print(myChats)
    return render_template("index.html", myChats=myChats)

@app.route('/api', methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        question = request.json.get("question")
        existingChat = mongo.db.chats.find_one({"question": question})
        if existingChat:
            data = {"answer": f"{existingChat['answer']}"}
        else:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                    "role": "user",
                    "content": question
                    }
                ],
                temperature=1,
                max_tokens=256,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )

            print("-------response---------", response)
            answer = response.choices[0].message['content']
            mongo.db.chats.insert_one({"question": question, "answer": answer})
            data = {"answer": answer}
        return jsonify(data)

app.run(debug=True)