/**********************************************************************************************************************
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.                                                *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 *********************************************************************************************************************/

import { ResourcePart, SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as events from '@aws-cdk/aws-events';
import * as kinesis from '@aws-cdk/aws-kinesis';
import * as cdk from '@aws-cdk/core';
import { CustomIngestion } from '../lib/ingestion/custom-ingestion';

test('Test custom ingestion nested stack', () => {
    const stack = new cdk.Stack();
    const _eventBus = new events.EventBus(stack, 'Bus');

    const _s3EventIntegration = new CustomIngestion(stack, 'testS3Event', {
        parameters: {
            "EventBus": _eventBus.eventBusArn,
            "StreamARN": new kinesis.Stream(stack, 'Stream', {}).streamArn,
        }
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    expect(stack).toHaveResourceLike("AWS::CloudFormation::Stack", {
        "Type": "AWS::CloudFormation::Stack",
        "Properties": {
            "TemplateURL": {},
            "Parameters": {
                "EventBus": {
                    "Fn::GetAtt": []
                },
                "StreamARN": {
                    "Fn::GetAtt": []
                },
            }
        },
        "UpdateReplacePolicy": "Delete",
        "DeletionPolicy": "Delete"
    }, ResourcePart.CompleteDefinition);
});