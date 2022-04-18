window.onload = () => {

    let singleButton = document.getElementById('single-submit')

    async function singleVerification(event) {
        event.preventDefault()
        let input = document.getElementById('toTest')
        console.log(input.value)
        const resultt = await fetch(`https://aaront612.pythonanywhere.com/multi/${input.value}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { return data })

        console.log(resultt)

        let resultText = document.getElementById('Result')
        let inputRes = document.getElementById('input-res')


        if (resultt['Result'] === 'Invalid') {
            resultText.style.color = 'Red'
            resultText.innerText='Invalid'
        } else {
            resultText.style.color = 'Green'
            resultText.innerText='Valid'
        }

        inputRes.innerText=`${resultt['Input']}`

        
        let output2 = document.getElementById('output2')
        output2.innerText = `Reason: ${resultt['Reason']}`

    }

    singleButton.addEventListener('click', singleVerification)


    let fileButton = document.getElementById('filesub')

    let uploaded = document.getElementById('file1')

    function fileBeta(event){
        event.preventDefault()
        if(uploaded.files.length === 0) return

        let csv = papa.parse(uploaded.files[0])
        
        console.log(csv)
        
    }

    fileButton.addEventListener('click', fileBeta)

}



//verifyEmail('aaront612@gmail.com')