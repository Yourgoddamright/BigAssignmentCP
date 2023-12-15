// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

const mdb = require('mongodb')
const { ObjectID } = mdb;

export type PackageSize = "small" | "medium" | "large";

export class Package {
    readonly _id: string;
    tag: string;
    weight: number;
    size: PackageSize;

    constructor(id? : string) {
        this._id = id || (new ObjectID()).toHexString();
        this.tag = '';
        this.weight = 0;
        this.size = 'small';
    }
}
