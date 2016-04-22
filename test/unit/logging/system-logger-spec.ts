/// <reference path="../../../typings/mocha/mocha.d.ts" />

import {expect} from "chai";

import {SystemLogger} from '../../../cmbf2-core/logging/system-logger';

describe('SystemLogger', () => {

    it('should create underlying bunyan logger', () => {
        var logger = SystemLogger.get();
        expect(logger).not.to.be.undefined;
    });

});
