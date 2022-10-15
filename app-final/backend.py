import re
import smtplib
import dns.resolver
import csv

# from email_validator import validate_email



def email_verify(e):

    global reason
    global code
    global mxRecord
    global domain
    global disposable

    print(e)

    #preset outcomes

    disposable = 'Untested'
    domain = 'Unstested'
    mxRecord = 'Untested'
    code = 'Untested'
    reason = 'Unsure - Please Try Again (report this error if found so we can improve)'

    #testing begins

    regex = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$"
    inputAddress = e
    addressToVerify = str(inputAddress)
    match = re.match(regex, addressToVerify)
    if match == None:
                reason = 'Invalid Format'
                return 'Invalid'
                print('lol')
                exit()
    splitAddress = addressToVerify.split('@')
    domain = str(splitAddress[1])
    print('Domain:', domain)


    try:
            dns.resolver.query(domain, 'MX')

    except:
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
        server.helo(server.local_hostname)
        server.mail(e)
        code, message = server.rcpt(str(addressToVerify))
        server.quit()
        if code == 250:
            reason = 'Passed all tests'
            return 'Valid'
            print("success")
            exit()
        else:
            reason = 'Mailbox does not exist or is full'
            return 'Invalid'
            print('fail')
            exit()



    except (smtplib.SMTPServerDisconnected):
            reason = 'Passed all tests.'
            return 'Valid'

    except :
            reason = 'No Response from server'
            return 'Invalid'

        # end of function #
# email_verify('darakjy@hotmail.org')


def email_verifyy(e):

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

    regex = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$"
    inputAddress = e
    addressToVerify = str(inputAddress)
    match = re.match(regex, addressToVerify)
    if match == None:
                reason = '- Invalid Format'
                return 'Invalid ' + reason
                print('lol')
                exit()
    splitAddress = addressToVerify.split('@')
    domain = str(splitAddress[1])
    print('Domain:', domain)


    try:
            dns.resolver.query(domain, 'MX')

    except:
            reason = '- No MX Server Exist'
            return 'Invalid ' + reason

    records = dns.resolver.query(domain, 'MX')
    mxRecord = records[0].exchange
    mxRecord = str(mxRecord)

    with open('disposable.csv', 'rt') as f:
            reader = csv.reader(f, delimiter=',')
            for row in reader:
                    for field in row:
                        if field == domain:
                                reason = '- Disposable Email Domain'
                                disposable = 'True'
                                return 'Invalid ' + reason
                        else:
                                disposable = 'False'

    try:
        server = smtplib.SMTP()
        server.set_debuglevel(0)
        server.connect(mxRecord)
        server.helo(server.local_hostname)
        server.mail(e)
        code, message = server.rcpt(str(addressToVerify))
        server.quit()
        if code == 250:
            reason = '- Passed all tests'
            return 'Valid ' + reason
            print("success")
            exit()
        else:
            reason = '- Mailbox does not exist or is full'
            return 'Invalid ' + reason
            print('fail')
            exit()



    except (smtplib.SMTPServerDisconnected):
            reason = '- MX Server Disconnected - Please try again or report this error'
            return 'Unsure ' + reason

    except :
            reason = '- Error - Please try again or report this error'
            return 'Unsure ' + reason

        # end of function #


# def email_verify_new(e):

#         global reason
#         global code
#         global mxRecord
#         global domain
#         global disposable

#         print(e)

#         #preset outcomes

#         disposable = 'Untested'
#         domain = 'Unstested'
#         mxRecord = 'Untested'
#         code = 'Untested'
#         reason = 'Unsure - Please Try Again (report this error if found so we can improve)'

#         #testing begins

#         testEmail = "exampleeeee123123123123@numetric.com"

#         emailObject = validate_email(testEmail)
#         print(emailObject.email)




#         # end of function #
# email_verify_new('hi')