/// <reference path="../../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import * as SystemLogger from '../../../src/cmbf2-core/logging/central-logger';

describe('CentralLogger', () => {

    it('should create underlying bunyan logger', () => {
        var logger = SystemLogger.root();
        console.dir(logger);
        expect(logger).not.to.be.undefined;
    });

});
