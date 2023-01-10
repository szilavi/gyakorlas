const { makeUserList, countSmallWords, getCompanyNames, customers, userList } = require('../exercises/main');

describe('Céges nevek kigyűjtésének tesztelése', () => {
    test('Tesztelés jelen lévő várossal', () => {
        const list = customers;
        expect(getCompanyNames(list, 'Budapest').length).toBe(1);
    });

    test('Tesztelés nem létező várossal', () => {
        const list = customers;
        expect(getCompanyNames(list, 'Baltazar').length).toBe(0);
    });

    test('Tesztelés létező város esetén cégnévre', () => {
        const list = customers;
        const results = getCompanyNames(list, 'New York');
        expect(results[1]).toBe('Hilton');
    });
})


describe('3 betűs szavak megszámolásának tesztelése', () => {
    beforeEach(() => {
        const htmlTemplate = `<p id="text">Irány Horány. Nem állunk meg. Senki kedvéért sem!</p>`;
        document.body.innerHTML = htmlTemplate;
        document.getElementById('text').innerText = `Irány Horány. Nem állunk meg. Senki kedvéért sem!`;
    });

    test('Létezik több hárombetűs szó', () => {
        expect(countSmallWords()).toBe(3);
    });

    test('Nem létezik hárombetűs szó', () => {
        document.getElementById('text').innerText = `Irány Horány. Álljunk itten! Senki kedvéért indulni!`;
        document.getElementById('text').innerHTML = `Irány Horány. Álljunk itten! Senki kedvéért indulni!`;

        expect(countSmallWords()).toBe(0);
    });
})

describe('Névlista építése', () => {
    beforeEach(() => {
        const htmlTemplate =
            `<div>
                <ul id="list-holder"></ul>
            </div>`;
        document.body.innerHTML = htmlTemplate;
    });

    test('Minden szereplő megjelenik a listában', () => {
        const childresOfList = makeUserList(userList);
        expect(childresOfList.childNodes.length).toBe(5);
    });

    test('A nők vastag betűvel jelennek meg', () => {
        const childresOfList = makeUserList(userList);
        expect(childresOfList.childNodes[0].innerHTML).toBe('<strong>Gizi</strong>');
        expect(childresOfList.childNodes[3].innerHTML).toBe('<strong>Kati</strong>')
        expect(childresOfList.childNodes[4].innerHTML).toBe('<strong>Vali</strong>')
    });

    test('A férfiak sima szövegként jelennek meg', () => {
        const childresOfList = makeUserList(userList);
        expect(childresOfList.childNodes[1].innerHTML).toBe('Vili');
        expect(childresOfList.childNodes[2].innerHTML).toBe('Andor');
    });

})
