var processController = (function () {

    function getPrime (num) {
        let dividerNums = Math.floor((num / 2) + 1)
        for (let i = 2; i < dividerNums; i ++) {
            if (num < 2 || num % i === 0) {
                return false
            }
        }
        return true
    }

    function getRange (start, end) {
        let range, primeNums;
        range = [];
        primeNums = [];

        for (let i = start; i < end + 1; i ++) {
            range.push(i)
        }

        for (let num of range) {
            if (getPrime(num)) {
                primeNums.push(num)
            }
        }
        return primeNums
    }

    function getDivisibility (num) {
        let divisibleNums = []
        for (let i = 1; i < num + 1; i ++) {
            if (num % i === 0) {
                divisibleNums.push(i)
            }
        }

        return divisibleNums;
    }



    return {
        prime: function (num) {
            return getPrime(num)
        },

        range: function (start, end) {
            return getRange(start, end)
        },

        divisibility: function (num) {
            return getDivisibility(num)
        }
    }

})()




var UIController = (function () {

    var DOM = {
        btnCont: '.btn-cont',
        btnIcons: '.icons',
        main: '.main',
        default: '.default',

        primeCont: '.check-prime_main',
        primeInput: '.prime-num',
        primeBtn: '.check-prime-enter',
        primeOutput: '.check-prime-output',
        divisibilityCheck: '.divisibility-check',

        rangeStart: '.range-start',
        rangeEnd: '.range-end',
        rangeOutput: '.range_main-output',
        rangeWarn: '.warning',
        rangeNoWarnBtn: '.no-warn',
        rangeBtn: '.range_main-enter',
        rangePrimeNumsLength: '.prime-num-list-length',

        divisibilityCont: '.divisibility_main',
        divisibilityNum: '.divisible-num',
        divisibilityBtn: '.divisible-enter',
        divisibilityOutput: '.divisibility-output',
        totalDivisibility: '.total-divisibility'
    }



    return {
        getDOM: function () {
            return DOM
        },

        getInput: function () {
            return {
                prime: parseInt(document.querySelector(DOM.primeInput).value),
                rangeStart: parseInt(document.querySelector(DOM.rangeStart).value),
                rangeEnd: parseInt(document.querySelector(DOM.rangeEnd).value),
                divisibility: parseInt(document.querySelector(DOM.divisibilityNum).value),
            }
        },

        displayConts: function (e) {
            let parentCont1, parentCont2, parentCont3, mainID, contents
            parentCont1 = e.target.parentNode.id
            parentCont2 = e.target.parentNode.parentNode.id
            parentCont3 = e.target.parentNode.parentNode.parentNode.id
    
            if (parentCont1) mainID = parentCont1
            else if  (parentCont2) mainID = parentCont2
            else if (parentCont3) mainID = parentCont3
    
            contents = Array.from(document.querySelectorAll('.main'))
    
            contents.forEach(cur => {
                let contID = cur.classList[1].split('_')[0]
                if (contID === mainID) {
                    document.querySelector(DOM.default).style.display = 'none'
                    document.querySelector(`.${contID}_main`).style.display = 'initial'
                } else {
                    document.querySelector(`.${contID}_main`).style.display = 'none'
                }
            })

        },

        displayPrime: function (num, isPrime) {
            let mainText;
            if (isPrime) {
                mainText = `${num} is a Prime Number`
                document.querySelector(DOM.divisibilityCheck).style.display = 'none'
            } else {
                mainText = `${num} is not a Prime Number`
                if (num !== 1) {
                    document.querySelector(DOM.divisibilityCheck).style.display = 'initial'
                }
            }

            if (num > 1000000000) {
                mainText = `Trying to trick me with that much big Number? No problem.. ${mainText}`
            } else if (num === '') {
                mainText = 'Nothing to check'
            }

            document.querySelector(DOM.primeOutput).textContent = mainText
        },

        gotoDivisibility: function () {

            document.querySelector(DOM.primeCont).style.cssText = "display: none; transform: translateX(0); transition: ease-in 0.3s"
            document.querySelector(DOM.divisibilityCont).style.cssText = "display: initial; transform: translateX(0); transition: ease-in 0.3s"

            document.querySelector(DOM.divisibilityNum).value = document.querySelector(DOM.primeInput).value
        },

        displayRange: function (mainOutput) {
            document.querySelector(DOM.rangeOutput).textContent = mainOutput
            document.querySelector(DOM.rangePrimeNumsLength).textContent = `Total Prime Numbers : ${mainOutput.length}`    
        },

        displayDivisibility: function (mainOutput) {
            let mainText;
            if (mainOutput.length !== 2) {
                mainText = mainOutput
                document.querySelector(DOM.divisibilityOutput).style.cssText = "font-family: 'Segoe UI'; letter-spacing: 2px"
            } else {
                document.querySelector(DOM.divisibilityOutput).style.cssText = "font-family: 'Comic Sans MS'; font-weigth: 400; letter-spacing: 0"
                mainText = `Your number is a Prime Number, It is only divisible by 1 and ${mainOutput[1]}`
            }

            document.querySelector(DOM.divisibilityOutput).textContent = mainText
            document.querySelector(DOM.totalDivisibility).textContent = `Total : ${mainOutput.length}`
        }

    }

})()




var controller = (function (processCtrl, UICtrl) {

    var DOM = UICtrl.getDOM()

    function getPrimeNumOutput () {
        let primeNum = UICtrl.getInput().prime

        if (!isNaN(primeNum) && primeNum > 1) {
            let isPrime = processCtrl.prime(primeNum)
            UICtrl.displayPrime(primeNum, isPrime)
        }
    }

    function getRangeOutput () {
        let rangeStart, rangeEnd, rangeOutput;
        rangeStart = UICtrl.getInput().rangeStart
        rangeEnd = UICtrl.getInput().rangeEnd

        if (!isNaN(rangeStart) && !isNaN(rangeEnd)) {
            rangeOutput = processCtrl.range(rangeStart, rangeEnd)
            UICtrl.displayRange(rangeOutput)
        }
    }

    function getDivisibilityOutput () {
        let divisibleNum, divisibilityOutput
        divisibleNum = UICtrl.getInput().divisibility

        if (!isNaN(divisibleNum)) {
            divisibilityOutput = processCtrl.divisibility(divisibleNum)
            UICtrl.displayDivisibility(divisibilityOutput) 
        }
    }


    function setupEventListeners () {

        Array.from(document.querySelectorAll(DOM.btnIcons)).forEach(cur => cur.addEventListener('click', UICtrl.displayConts))

        document.querySelector(DOM.primeBtn).addEventListener('click', getPrimeNumOutput)
        document.querySelector(DOM.divisibilityCheck).addEventListener('click', UICtrl.gotoDivisibility)

        document.querySelector(DOM.rangeBtn).addEventListener('click', getRangeOutput)
        document.querySelector(DOM.divisibilityBtn).addEventListener('click', getDivisibilityOutput)

    }

    return {
        init: function () { 
            setupEventListeners()
        }
    }

})(processController, UIController)

controller.init()
