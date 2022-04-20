//Call Parser
import Parser from './Parser';


test("numbersFromString test",() => {
    let numArr = ['1','1','2','3','9','8','7','6','5','4','3','2','1'];
    expect(Parser.getAllNumbersFromString("Mert1Arthur123Baraah987654321")).toStrictEqual(numArr);
})

test("dateToDayMonth test", () => {
    let date = new Date(1650402378000)
    expect(Parser.dateToDayMonth(date)).toBe("20/04");
})

test("unixTimeStamp test",() => {
    let timeStamp = 1650402378;
    expect(Parser.unixToDate(timeStamp)).toBe("20/04");
})