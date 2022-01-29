import re
import smtplib
import dns.resolver
import csv

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