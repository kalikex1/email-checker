import re
import smtplib
import dns.resolver
import csv

import phonenumbers

from phonenumbers import carrier


import requests
from urllib.request import urlopen
import json

from bs4 import BeautifulSoup

def email_verify(e):

    global reason
    global code
    global mxRecord
    global domain
    global disposable

    print(e)

    #preset outcomes#

    disposable = 'Untested'
    domain = 'Unstested'
    mxRecord = 'Untested'
    code = 'Untested'
    reason = 'Unsure - Please Try Again (report this error if found so we can improve)'

    #testing begins#

    regex = "[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$"
    inputAddress = e
    addressToVerify = str(inputAddress)
    match = re.match(regex, addressToVerify)
    if match == None:
                reason = 'Invalid Format'
                return 'Invalid' 
                print('lol')
                exit()
    domain = e
    print('Domain:', domain)

    
    try:
            dns.resolver.query(domain, 'MX')

    except dns.resolver.NoAnswer:
            reason = 'No MX Server Exist'
            return 'Invalid'
            
    records = dns.resolver.query(domain, 'MX')
    mxRecord = records[0].exchange
    mxRecord = str(mxRecord)

    with open('disposable.csv', 'rt') as f:
            reader = csv.reader(f, delimiter=',')
            for row in reader:
                    for field in row:
                        if field == domain:
                                reason = 'Disposable Email Domain'
                                disposable = 'True'
                                return 'Invalid'
                        else:
                                disposable = 'False'
     
    try:
        server = smtplib.SMTP()
        server.set_debuglevel(0)
        server.connect(mxRecord)
        reason = 'Passed All Tests'
        return 'Valid'



    except (smtplib.SMTPServerDisconnected):
            reason = 'MX Server Disconnected - Please try again or report this error'
            return 'Unsure'
    
    except :
            reason = 'MX Server Disconnected - Please try again or report this error'
            return 'Unsure'

        # end of function #


def phone_verify(cell):

        number = '+1'+cell

        phoneNumber = phonenumbers.parse(number, 'en')

        if phonenumbers.is_valid_number(phoneNumber):

                pNum = cell

                first = pNum[0]+pNum[1]+pNum[2]
                second = pNum[3]+pNum[4]+pNum[5]
                third = pNum[6]+pNum[7]+pNum[8]+pNum[9]

                url = 'http://www.fonefinder.net/findome.php?npa='+first+'&nxx='+second+'&thoublock='+third+'&usaquerytype=Search+by+Number&cityname='

                headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

                html = requests.get(url, headers=headers, timeout=10).text

                doc = BeautifulSoup(html, 'html.parser')

                test = doc.find_all('td')[6]

                treasure = test.find_all('a')[0].text

                # Carrier = data['carrier']['name']
                
                return {
                        'Result': 'Valid',
                        'Carrier': str(treasure)
                }
        else:
                return {
                        'Result': 'Invalid',
                        'Carrier': 'N/A'
                }