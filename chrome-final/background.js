//import fetch from "node-fetch"; 
//import fetch from 'node-fetch';

let apiURL = "https://aaront612.pythonanywhere.com/multi/"

// let obj = {
//     'Result': 'Submit email to test',
//     'Input': 'Submit email to test',
//     'Reason': 'Submit email to test',
//     'Domain': 'Submit email to test',
//     'Disposable': 'Submit email to test',
//     'MX_Server': 'Submit email to test',
//     'SMTP_Code': 'Submit email to test',
// }
// let obj = {
//     'Result': 'Submit email to test',
//     'Input': 'Submit email to test',
//     'Reason': 'Submit email to test',
//     'Domain': 'Submit email to test',
//     'Disposable': 'Submit email to test',
//     'MX_Server': 'Submit email to test',
//     'SMTP_Code': 'Submit email to test',
// }

// function load(){
//     for (keys in obj){
//         if (keys === 'Result') {
//             document.getElementById(keys).innerHTML = (obj[keys])
//         } else {
//             document.getElementById(keys).innerHTML = (keys + '  -     ' + obj[keys])
//         }
//     }
// }


async function verifyEmail(email){
//let res
    await fetch(apiURL+email,{
        method: "GET",
        mode: "cors",
        headers: {
            origin: "a",
        },
    }).then(function(response){
        response = response.json()
        return response
    }).then(function(data){
        for (keys in data){
            console.log(keys +'     '+data[keys])
            if(keys === 'Result'){
                //obj[keys] = data[keys]
                document.getElementById(keys).innerHTML = (data[keys])
            }else{
                //obj[keys] = data[keys]
                document.getElementById(keys).innerHTML = (keys +'  -     ' +data[keys])
            }
                //console.log(result)
        }
    })
}

//verifyEmail('aaront612@gmail.com')