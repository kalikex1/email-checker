const papa = require('papaparse')

window.onload = () => {

    let singleButton = document.getElementById('single-submit')

    async function singleVerification (event) {
        event.preventDefault()
        let input = document.getElementById('toTest')
        console.log(input.value)
        const resultt = await fetch(`https://aaront612.pythonanywhere.com/multi/${input.value}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {return data})

        console.log(resultt)

        let resultImg = document.getElementById('result-img')
        console.log(resultImg.attributes)

        let output1 = document.getElementById('output1')

        if(resultt['Result'] === 'Invalid'){
            resultImg.setAttribute('src', './content/invalid.png')
            resultImg.style.display='block'
        }else{
            resultImg.setAttribute('src', './content/valid.png')
            resultImg.style.display = 'block'
        }

        output1.innerText = `${resultt['Input']} is ${resultt['Result']} !`

        let output2 = document.getElementById('output2')
        output2.innerText = `Reason: ${resultt['Reason']}`

    }

    singleButton.addEventListener('click', singleVerification)

    


    

}

async function isEmailValid(email) {
    const result = await fetch(`https://aaront612.pythonanywhere.com/multi/${input.value}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => { return data })

    console.log(result)
    return result
}
