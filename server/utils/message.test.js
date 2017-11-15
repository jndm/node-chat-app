const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jari';
        var text = 'Hello World!';

        var message = generateMessage(from, text);
        
        expect(message).toMatchObject({
            from: from,
            text: text
        });

        expect(typeof(message.createdAt)).toBe('number');
    });
});