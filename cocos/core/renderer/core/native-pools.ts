/*
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @hidden
 */

export class NativeBufferPool {
    private _arrayBuffers: ArrayBuffer[] = [];
    private _chunkSize: number;
    constructor (dataType: number, entryBits: number, stride: number) {
        this._chunkSize = stride * (1 << entryBits);
    }
    public allocateNewChunk () { return new ArrayBuffer(this._chunkSize); }
}

export class NativeObjectPool<T> {
    constructor (dataType: number, array: T[]) {}
}

export class NativeArrayPool {
    private _size: number;
    constructor (poolType: number, size: number) {
        this._size = size;
    }

    public alloc (index: number) : Uint32Array {
        return new Uint32Array(this._size);
    }

    public resize (origin: Uint32Array, size: number) : Uint32Array {
        let array = new Uint32Array(size);
        array.set(origin);
        return array;
    }
}
