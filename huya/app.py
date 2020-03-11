# -*- coding: utf-8 -*-
#@author='yuewei'
#@Time:2019/3/12  21:48
from flask import Flask,request,render_template
from flask_cors import CORS
import codecs
from spider import *
app = Flask(__name__)
CORS(app)

# @app.route("/",methods=["GET","POST"])
# def ball():
#     if request.method=="POST":
#         data = request.form.get("ball")
#         print(data)
#         with codecs.open("ball.csv",'a',encoding="utf-8") as f:
#             f.write(data)
#         return "ok"

@app.route("/",methods=["GET","POST"])
def index():
    return render_template("index.html")

@app.route("/ucard",methods=["GET","POST"])
def ucard():
    with codecs.open('ucard_e957674.js','r',encoding="utf-8") as f:
        data = f.read()
    return data
@app.route("/change",methods=["GET","POST"])
def change():
    RoomID = request.args.get("RoomID")
    print(RoomID)
    data = changeRoom(RoomID)
    if data == "房间号不存在":
        return "房间号不存在"
    else:
        return render_template(RoomID+".html")



@app.route("/person",methods=["GET","POST"])
def Person():
    if request.method=="POST":
        data = request.form.get("person")
        filename = request.form.get("filename")
        print(data)
        if len(re.findall("送礼消息",data))==0:
            with codecs.open("./fileName/"+filename+".csv",'a',encoding="utf-8") as f:
                f.write(data)
            return "yes"
        return "ok"


if __name__ == '__main__':
    app.run(port=8888,host="127.0.0.1",debug=True)