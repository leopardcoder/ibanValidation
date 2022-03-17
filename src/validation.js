import fs, {readFileSync} from 'fs';

let ibanCountriesDataFile = fs.readFileSync('./data/iban_length.json');
let ibanData = JSON.parse(ibanCountriesDataFile);
let countryList = ibanData.values

export function getCountryIbanData(ibanArray) {
    typeof ibanArray != "object" ? ibanArray = [ibanArray] : ibanArray
    let newArray = []
    ibanArray.forEach(iban => {
        if (iban.length < 35) {
            let providedCountry = iban.slice(0, 2)
            for (let x = 0; x < countryList.length; x++) {
                let countryIbanLength = countryList[x].length
                if (providedCountry === countryList[x].code && iban.length == countryIbanLength) {
                    return newArray.push({iban: iban, validity: true, length: iban.length})
                }
            }
            return newArray.push({iban: iban, validity: false})
        } else {
            return newArray.push({iban: iban.slice(0,20) + "...", validity: false})
        }
    })
    return newArray
}

export function rearrangeIban(ibanObjectsArray) {
    let newArray = []
    ibanObjectsArray.forEach(ibanObject => {
        if (ibanObject.validity) {
            let countryBankCode = ibanObject.iban.slice(0, 4)
            let bban = ibanObject.iban.slice(4, ibanObject.iban.length)
            let rearrangedIban = bban + countryBankCode
            return newArray.push({
                rearranged: rearrangedIban,
                iban: ibanObject.iban,
                length: ibanObject.length,
                validity: true
            })
        } else {
            return newArray.push({iban: ibanObject.iban, validity: false})
        }
    })
    return newArray
}
export function convertIbanToInt(rearrangedIbanObjects) {
    let newArray = []
    rearrangedIbanObjects.forEach(ibanObject => {
        if (ibanObject.validity) {
            let ibanInts = ''
            for (let x = 0; x < ibanObject.rearranged.length; x++) {
                if (ibanObject.rearranged[x].toUpperCase() !== ibanObject.rearranged[x].toLowerCase() && ibanObject.rearranged.codePointAt(x) < 125) {
                    ibanInts = ibanInts.concat(ibanObject.rearranged[x].charCodeAt(0) - 55)
                } else {
                    ibanInts = ibanInts.concat(ibanObject.rearranged[x])
                }
            }
            newArray.push({
                rearranged: ibanObject.rearranged,
                iban: ibanObject.iban,
                rearrangedInt: ibanInts,
                length: ibanObject.length,
                validity: true
            })
        } else {
            newArray.push({iban: ibanObject.iban, validity: false})
        }
    })
    return newArray
}
export function getFinalResults(ibanIntObjects) {
    let finalResults = []
    ibanIntObjects.forEach(ibanIntObject => {
        if (ibanIntObject.validity) {
            const remainder = calculateMod97(ibanIntObject.rearrangedInt, ibanIntObject.length)
            if (remainder === 1) {
                finalResults.push({iban: ibanIntObject.iban, validity: true})
            } else {
                finalResults.push({iban: ibanIntObject.iban, validity: false})
            }
        } else {
            finalResults.push({iban: ibanIntObject.iban, validity: false})
        }
    })
    return finalResults
}
export function calculateMod97(ibanIntegers, ibanLength, remainder = '') {

    if (ibanIntegers !== undefined && ibanLength > 0) {
        let nineDigitsNumber = ibanIntegers.length == ibanLength ? ibanIntegers.slice(0, 9) : remainder + ibanIntegers.slice(0, 7)
        let nextRemainder = nineDigitsNumber % 97
        let left = ibanIntegers.length == ibanLength ? ibanIntegers.slice(9, ibanIntegers.length) : ibanIntegers.slice(7, ibanIntegers.length)

        if (ibanIntegers < 98) {
            return nineDigitsNumber % 97
        }
        return calculateMod97(left, ibanLength, nextRemainder)
    }
}

export function runValidation(ibanArray) {
    const stringToArray = ibanArray.split(',')
    let countryIbanData = getCountryIbanData(stringToArray)
    const rearrangedIbans = rearrangeIban(countryIbanData)
    const convertedToIntIbans = convertIbanToInt(rearrangedIbans)
    const finalResults = getFinalResults(convertedToIntIbans)
    return finalResults
}
