/// <reference path="../../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";
import {CentralLogger} from "../../../src/logging/central-logger";

describe('CentralLogger', () => {

    it('should create underlying bunyan logger', () => {
        var logger = new CentralLogger();
        expect(logger).not.to.be.undefined;
    });

});
