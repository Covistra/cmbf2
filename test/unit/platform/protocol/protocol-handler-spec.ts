/// <reference path="../../../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {ProtocolHandler} from "../../../../cmbf2-core/platform/protocol/protocol-handler";
import {ResolveServiceRequest} from "../../../../cmbf2-core/platform/requests/resolve-service-request";
import {ServiceRequest} from "../../../../cmbf2-core/platform/service-request";
import * as System from "../../../../cmbf2-core/platform/system";

describe('ProtocolHandler', function() {
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

    it('should properly encode and decode a service-request', function() {
        let req : ServiceRequest = new ResolveServiceRequest({
            group: 'accounting:receivables',
            action: 'enquiry',
            target: 'invoice:late'
        });

        var buffer = protocolHandler.encode(req);

        var msg = protocolHandler.decode(buffer);
        expect(msg.group).to.equal("system");
        expect(msg.payload.group).to.equal("accounting:receivables");
        expect(msg.action).to.equal(System.Actions.Discover);
        expect(msg.target).to.equal(System.Schemas.Service);
        expect(msg.payload.target).to.equal('invoice:late');
        expect(msg.payload.action).to.equal('enquiry');
    });
});
