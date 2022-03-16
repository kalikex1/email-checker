//import fetch from "node-fetch"; 
//import fetch from 'node-fetch';

let apiURL = "https://aaront612.pythonanywhere.com/multi/"

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

document.addEventListener('DOMContentLoaded', function() {
    //let tester = document.getElementById('email1').value;
    //let link = document.getElementById('go')
    // onClick's logic below:
    document.getElementById('go').addEventListener('click', verifyEmail(document.getElementById('email1').value));
});



//verifyEmail('aaront612@gmail.com')