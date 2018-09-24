test('1 should equal 1', () => {
    expect(1).toBe(1);
})

const exampleObject = {
    key: "Hello",
    value: "Test"
}

test('Objects to be equal', () => {
    expect(exampleObject).toMatchObject({
        key: "Hello", 
        value: "Test"
    });
})