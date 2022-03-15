import {getCountryIbanData} from './validation'

test("Enter IBAN number with country that doesn't use IBAN, or any other two letters. Should return validity false.", () => {
    expect(getCountryIbanData(['QA893202312312321'])).toEqual([{"iban": "QA893202312312321", "validity": false}]);
})
test("Enter country that has IBAN with correct length of IBAN. This test should return validity true, and length value of 20.", () => {
    expect(getCountryIbanData(['LT487044060008228908'])).toEqual([{"iban": "LT487044060008228908", "length":20, "validity": true}]);
})
test("Enter country that has IBAN, but length of IBAN is incorrect. ", () => {
    expect(getCountryIbanData(['LT48704406000822890812'])).toEqual([{"iban": "LT48704406000822890812", "validity": false}]);
})
test("Enter any string or number that length is more than 35. SHould return first 20 symbols of string and three dots (...)", () => {
    expect(getCountryIbanData(['LT48704406000822890812742349872348237497902342340978923423423423423'])).toEqual([{"iban": "LT487044060008228908...", "validity": false}]);
})
test("Enter more than one iban number. Should check and return all iban numbers. ", () => {
    expect(getCountryIbanData(['LT48704406000822890812', 'LT48704406000822890813'])).toEqual([{"iban": "LT48704406000822890812", "validity": false}, {"iban": "LT48704406000822890813", "validity": false}]);
})
