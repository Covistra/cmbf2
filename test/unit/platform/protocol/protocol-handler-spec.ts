/// <reference path="../../../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {ProtocolHandler} from "../../../../cmbf2-core/platform/protocol/protocol-handler";

describe.only('ProtocolHandler', function() {
    let protocolHandler: ProtocolHandler;

    beforeEach(function(){
        protocolHandler = new ProtocolHandler();
    });

    it('should encode a plain json object', function() {
        var date = new Date();
        var obj = {
            plain: true,
            type: 'plain',
            plain_count: 5,
            child: {
                field: '1'
            },
            array: [{
                elm: 1,
                file: 'my-file-name.html'
            }, {
                elm: 2,
                file: 'my-file-2.html'
            }],
            plain_date: date.toUTCString()
        };

        // Encode our source object
        var result = protocolHandler.encode(obj);

        // Decode our result to compare
        var msg = protocolHandler.decode(result);

        expect(msg.plain).to.be.true;
        expect(msg.type).to.equal('plain');
        expect(msg.plain_count).to.equal(5);
        expect(msg.child).to.eql({field: '1'});
        expect(msg.array.length).to.equal(2);
        expect(msg.plain_date).to.eql(date.toUTCString());
    });

});
