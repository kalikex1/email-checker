from audioop import cross
from email import header
from flask import *
from flask.templating import render_template
from werkzeug.datastructures import ResponseCacheControl
import backend
import domaincheck

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route("/home", methods = ["GET", "POST"])
@app.route("/", methods = ["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    if request.method == "POST":
        text = request.form.get('textbox')
        return render_template("home.html", 
        output = backend.email_verifyy(text),
        user_text = text, reason1 = backend.reason)


@app.route("/multi/<uuid>", methods=['GET'])
def api(uuid):
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")

    multip = backend.email_verify(uuid)

    return jsonify({
        'Input' : uuid ,
        'Result' : multip ,
        'Reason' : backend.reason ,
        'Domain' : backend.domain ,
        'Disposable' : backend.disposable ,
        'MX_Server' : backend.mxRecord ,
        'SMTP_Code' : backend.code
        },)


@app.route("/domain/<uuid>", methods=['GET'])
def domainapi(uuid):
    dcheck = domaincheck.email_verify(uuid)
    return jsonify({
        'Input' : uuid ,
        'Result' : dcheck ,
        'Reason' : domaincheck.reason ,
        'Disposable' : domaincheck.disposable ,
        'MX_Record' : domaincheck.mxRecord ,
        },)
        
@app.route("/phone/<uuid>", methods=['GET'])
def phone(uuid):
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")

    phoneResult = domaincheck.phone_verify(uuid)

    return jsonify({
        'Input' : uuid ,
        'Result' : phoneResult['Result'] ,
        'Carrier' : phoneResult['Carrier']
        },)

if __name__ == "__main__":
    app.run(debug=True)










# import re
# import smtplib
# import dns.resolver
# import requests
# import json

# e = ['Request.query_params.hero']

# print(e)

# fromAddress = "yes@no.com"
# regex = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$"
# inputAddress = e
# addressToVerify = str(inputAddress)
# match = re.match(regex, addressToVerify)
# if match == None:
#             ['python_data'] = e + ' is not valid - improper email format'
#             print('lol')
#             exit()
# splitAddress = addressToVerify.split('@')
# domain = str(splitAddress[1])
# print('Domain:', domain)
# records = dns.resolver.resolve(domain, 'MX')
# #bug here - noanswer on crazy @'s
# mxRecord = records[0].exchange
# mxRecord = str(mxRecord)

# server = smtplib.SMTP()
# server.set_debuglevel(0)
# server.connect(mxRecord)
# server.helo(server.local_hostname)
# server.mail(fromAddress)
# code, message = server.rcpt(str(addressToVerify))
# server.quit()


# if code == 250:
#         ['python_data'] = e + ' is valid - passed all tests'
#         print("success")
#         exit()
# else:
#         ['python_data'] = e + ' is not valid - did not pass SMTP check'
#         print('fail')
#         exit()