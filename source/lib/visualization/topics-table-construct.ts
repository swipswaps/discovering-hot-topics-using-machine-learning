#!/usr/bin/env node
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

import * as glue from "@aws-cdk/aws-glue";
import * as cdk from "@aws-cdk/core";
import { GenericCfnTable, GenericCfnTableProps } from "./generic-table-construct";

export class TopicsTable extends GenericCfnTable {

    constructor(scope: cdk.Construct, id: string, props: GenericCfnTableProps) {
        super(scope, id, props);
    }

    protected getColumns(): glue.CfnTable.ColumnProperty[] {
        return [{
            name: 'job_id',
            type: glue.Schema.STRING.inputString
        }, {
            name: 'job_timestamp',
            type: glue.Schema.TIMESTAMP.inputString
        }, {
            name: 'term',
            type: glue.Schema.STRING.inputString
        }, {
            name: 'weight',
            type: glue.Schema.DOUBLE.inputString
        }, {
            name: 'topic',
            type: glue.Schema.STRING.inputString
        }];
    }
}
