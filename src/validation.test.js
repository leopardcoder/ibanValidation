import {getCountryIbanData, rearrangeIban, convertIbanToInt, getFinalResults, runValidation} from './validation'

test("Enter IBAN code with country that doesn't use IBAN, or any other two letters. Should return validity false.", () => {
    expect(getCountryIbanData(['QA893202312312321'])).toEqual([{"iban": "QA893202312312321", "validity": false}]);
})
test("Enter IBAN code with correct length of IBAN. This test should return validity true, and length value of 20.", () => {
    expect(getCountryIbanData(['LT487044060008228908'])).toEqual([{
        "iban": "LT487044060008228908",
        "length": 20,
        "validity": true
    }]);
})
test("Enter country that has IBAN, but length of IBAN is incorrect. ", () => {
    expect(getCountryIbanData(['LT48704406000822890812'])).toEqual([{
        "iban": "LT48704406000822890812",
        "validity": false
    }]);
})
test("Enter any string or number that length is more than 34. SHould return first 20 symbols of string and three dots (...)", () => {
    expect(getCountryIbanData(['LT48704406000822890812742349872348237497902342340978923423423423423'])).toEqual([{
        "iban": "LT487044060008228908...",
        "validity": false
    }]);
})
test("Enter more than one IBAN code. Should check all IBAN codes and return IBAN codes object with validity key value: true or false.. ", () => {
    expect(getCountryIbanData(['LT48704406000822890812', 'LT48704406000822890813'])).toEqual([{
        "iban": "LT48704406000822890812",
        "validity": false
    }, {"iban": "LT48704406000822890813", "validity": false}]);
})
test("Enter any string or number that length is more than 34. SHould return object with entered string and validity false.", () => {
    expect(getCountryIbanData(['LT48'])).toEqual([{"iban": "LT48", "validity": false}]);
})


// rearrangeIban() function  invoked after checking if IBAN country code and length is valid.
// if IBAN country code and length is invalid, it will not rearrange anything and return same Object with false validity.
test("Enter array with this object [{\"iban\": \"LT487044060008228908\", \"length\":20, \"validity\": true}]. SHould return same " +
    "object and additionaly rearranged key with rearranged IBAN code, first four numbers are put in the end of IBAN code.", () => {
    expect(rearrangeIban([{"iban": "LT487044060008228908", "length": 20, "validity": true}]))
        .toEqual([{
            "iban": "LT487044060008228908",
            "length": 20,
            "rearranged": "7044060008228908LT48",
            "validity": true
        }]);
})

test("Enter array with this object [{\"iban\": \"LT487044060008228909\", \"validity\": false}]." +
    "Iban code is invalid, so function should return same object as entered, without rearrangement. ", () => {
    expect(rearrangeIban([{"iban": "LT487044060008228908", "validity": false}]))
        .toEqual([{"iban": "LT487044060008228908", "validity": false}]);
})


// convertIbanToInt() function converts rearranged IBAN code to integer. If IBAN code is invalid, it will not convert anything.
// ANd will return same object.
// convertIbanToInt() should get this structure object as parameter:
// a) [{"iban": "LT487044060008228908", "length":20, "rearranged": "7044060008228908LT48", "validity": true}]
// or b) [{"iban": "LT487044060008228908", "validity": false}]
// In case of a) it will convert IBAN code to integer and add aditional key to object "rearrangedInt" with rearranged value.
// In case of b) it will leave object as it is.

test("Should convert IBAN code to integer and add aditional key to object \"rearrangedInt\" with rearranged value. ", () => {
    expect(convertIbanToInt([{
        "iban": "LT487044060008228908",
        "length": 20,
        "rearranged": "7044060008228908LT48",
        "validity": true
    }]))
        .toEqual([{
            "iban": "LT487044060008228908",
            "length": 20,
            "rearranged": "7044060008228908LT48",
            "rearrangedInt": "7044060008228908212948",
            "validity": true
        }]);
})

test("Should return same object as given to parameter. ", () => {
    expect(convertIbanToInt([{"iban": "LT487044060008228908", "validity": false}]))
        .toEqual([{"iban": "LT487044060008228908", "validity": false}]);
})


// getFinalResults() function should receive array of one or more objects of this structure:
// [{"iban": "LT487044060008228908", "length":20, "rearranged": "7044060008228908LT48","rearrangedInt":"7044060008228908212948","validity": true}]
// This function will pass these objects into calculateMod97 recursive function, that will grab rearrangedInt
// and calculate mod 97 of it. Because JavaScript Number.MAX_SAFE_INTEGER value is less than rearrangedInt value
// we cannot use Math modulus % operator, because result will be inaccurate.
// calculateMod97() function is created based on this logic:

// 1) Starting from the leftmost digit of rearrangedInt, construct a number using the first 9 digits and call it N.
// 2) Calculate N mod 97.
// 3) Construct a new 9-digit N by concatenating the above result (step 2) with the next 7 digits of rearrangedInt.
// If there are fewer than 7 digits remaining in rearrangedInt but at least one, then construct a new N,
// which will have less than 9 digits, from the above result (step 2) followed by the remaining digits of rearrangedInt.
// 4) Repeat steps 2–3 until all the digits of rearrangedInt have been processed


test("Lets provide IBAN code object that is valid, and have rearrangedInt value. After final results we should" +
    "receive object with iban code and validity true. ", () => {
    expect(getFinalResults(
        [
            {
                "iban": "LT487044060008228908",
                "length": 20,
                "rearranged": "7044060008228908LT48",
                "rearrangedInt": "7044060008228908212948",
                "validity": true
            }
        ])).toEqual([{"iban": "LT487044060008228908", "validity": true}]);
})


// runValidation function runs all steps of algorithm and returns array of objects with structure:
// {iban: LT1234523453454545, validity: true}
// This function takes one parameter that is a string of iban codes separated with comma, or one iban code.

test("Lets check list of valid IBAN codes from https://www.iban.com/structure." +
    "And put some invalid IBAN codes, for example first three codes is invalid.", () => {
    expect(runValidation(
        'BU71096123456769,BO71096123456769,BA71096123456769,BE71096123456769,BA393385804800211234,AL35202111090000000001234567,' +
        'AD1400080001001234567890'
    )).toEqual([
            {"iban": "BU71096123456769", "validity": false},
        {"iban": "BO71096123456769", "validity": false},
        {"iban": "BA71096123456769", "validity": false},
        {"iban": "BE71096123456769", "validity": true},
        {"iban": "BA393385804800211234", "validity": true},
        {"iban": "AL35202111090000000001234567", "validity": true},
        {"iban": "AD1400080001001234567890", "validity": true},
            ]);
})
