import Input from "./Input";

test("isNegative test 1",() => {
    let str = "NAH";

    expect(Input.isNegative(str)).toBe(true);
});

test("isNegative test 2",() => {
    let str = "yEs";

    expect(Input.isNegative(str)).toBe(false);
});

test("isPositive test 1",() => {
    let str = "No";

    expect(Input.isPositive(str)).toBe(false);
})

test("isPositive test 2",() => {
    let str = "Y";

    expect(Input.isPositive(str)).toBe(true);
})