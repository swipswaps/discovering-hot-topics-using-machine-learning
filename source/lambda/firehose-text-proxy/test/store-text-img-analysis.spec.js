/**********************************************************************************************************************
 *  Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.                                      *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.orglicenses/LICENSE-2.0                                                                     *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 *********************************************************************************************************************/

"use strict"

const sinon = require('sinon');
const expect = require('chai').expect;
const assert = require('assert');
const AWSMock = require('aws-sdk-mock');

const ImageAnalysis = require('../util/store-text-img-analysis');
const __test_event__ = require('./event-test-data');

describe('Test Image analysis', () => {
    beforeEach(() => {
        process.env.REGION = 'us-east-1';
        process.env.AWS_SDK_USER_AGENT = '{ "cutomerAgent": "fakedata" }';

        process.env.TXT_IN_IMG_SENTIMENT_FIREHOSE = 'sentiment_stream';
        process.env.TXT_IN_IMG_ENTITY_FIREHOSE = 'entity_stream';
        process.env.TXT_IN_IMG_KEYPHRASE_FIREHOSE = 'keyphrase_stream';

        AWSMock.mock('Firehose', 'putRecord', (error, callback) => {
            callback(null, {
                "Encrypted": true,
                "RecordId": "49607933892580429045866716038015163261214518926441971714"
             });
        });

        AWSMock.mock('Firehose', 'putRecordBatch', (error, callback) => {
            callback(null, {
                "Encrypted": true,
                "FailedPutCount": 0,
             });
        });
    });

    afterEach(() => {
        AWSMock.restore('Firehose');

        delete process.env.REGION;
        delete process.env.TXT_IN_IMG_SENTIMENT_FIREHOSE;
        delete process.env.TXT_IN_IMG_ENTITY_FIREHOSE;
        delete process.env.TXT_IN_IMG_KEYPHRASE_FIREHOSE;
        delete process.env.AWS_SDK_USER_AGENT;
    });

    it ('should store the image analyzed information', async () => {
        const spy = sinon.spy(ImageAnalysis, 'storeTextFromImage');
        expect(await ImageAnalysis.storeTextFromImage(__test_event__.event_no_entity_keyphrase)).to.be.undefined;
        assert.equal(spy.callCount, 1);
        spy.restore();
    });
});