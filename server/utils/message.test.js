const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Admin';
        var lat = '61';
        var lng = '23';
        var expectedUrl = `https://maps.google.com/?q=${lat},${lng}`

        var message = generateLocationMessage(from, lat, lng);
        
        expect(message).toMatchObject({
            from: from,
            url: expectedUrl
        });

        expect(typeof(message.createdAt)).toBe('number');
    });
});