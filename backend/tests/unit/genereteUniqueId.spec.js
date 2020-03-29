const genereteUniqueId = require('../../src/utils/genereteUniqueId');

describe('Generate Unique Id', () => {
    it('Shold generete an unique ID', () => {
        const id = genereteUniqueId();

        expect(id).toHaveLength(8);
    });
});