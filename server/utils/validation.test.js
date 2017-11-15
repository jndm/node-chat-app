const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var number = 123;
        var result = isRealString(number);

        expect(result).toBe(false);
        expect(typeof(result)).toBe('boolean');
    });

    it('should reject string with only spaces', () => {
        var whitespaces = '      ';
        var result = isRealString(whitespaces);

        expect(result).toBe(false);
        expect(typeof(result)).toBe('boolean');
    });

    
    it('should allow string with non-space characters', () => {
        var name = 'Kimmo  ';
        var result = isRealString(name);

        expect(result).toBe(true);
        expect(typeof(result)).toBe('boolean');
    });
});