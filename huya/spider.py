import requests
import re
import codecs
def changeRoom(roomID):
    with codecs.open("./templates/index.html",'r',encoding="utf-8") as f:
        s = f.read()
        data = re.findall('<script data-fixed="true">(.*?)</script>', s, re.S)
    html = requests.get("https://www.huya.com/"+roomID).text
    data1 = re.findall('<script data-fixed="true">(.*?)</script>',html,re.S)
    print(data1)
    if len(data1[1]) > 200 :
        NewHtml = s.replace(data[1],data1[1])
        with codecs.open("./templates/"+roomID+".html","w",'utf-8') as f:
            f.write(NewHtml)
    else:
        return "房间号不存在"