/**
 * @hidden
 */

import { MeshBuffer } from '../../../ui';
import { Material } from '../../assets/material';
import { GFXTextureView, GFXSampler } from '../../gfx';
import { GFXBindingLayout } from '../../gfx/binding-layout';
import { Node } from '../../scene-graph';
import { Camera } from '../scene/camera';
import { Model } from '../scene/model';
import { UI } from './ui';
import { GFXInputAssembler, IGFXAttribute } from '../../gfx/input-assembler';
import { IPSOCreationInfo } from '../scene/submodel';

export class UIDrawBatch {
    private _bufferBatch: MeshBuffer | null = null;

    public camera: Camera | null = null;
    public ia: GFXInputAssembler | null = null;
    public model: Model | null = null;
    public material: Material | null = null;
    public texView: GFXTextureView | null = null;
    public sampler: GFXSampler | null = null;
    public psoCreateInfo: IPSOCreationInfo | null = null;
    public bindingLayout: GFXBindingLayout | null = null;
    public useLocalData: Node | null = null;
    public isStatic = false;

    public destroy (ui: UI) {
        if (this.psoCreateInfo) {
            ui._getUIMaterial(this.material!).revertPipelineCreateInfo(this.psoCreateInfo);
            this.psoCreateInfo = null;
        }

        if (this.bindingLayout) {
            this.bindingLayout = null;
        }

        if (this.ia) {
            this.ia.destroy();
            this.ia = null;
        }
    }

    public clear (ui: UI) {
        if (this.psoCreateInfo) {
            ui._getUIMaterial(this.material!).revertPipelineCreateInfo(this.psoCreateInfo);
            this.psoCreateInfo = null;
        }
        this.camera = null;
        this._bufferBatch = null;
        this.material = null;
        this.texView = null;
        this.sampler = null;
        this.model = null;
        this.isStatic = false;
    }

    get bufferBatch () {
        return this._bufferBatch;
    }

    set bufferBatch(meshBuffer : MeshBuffer | null) {
        if (this._bufferBatch == meshBuffer) {
            return;
        }

        this._bufferBatch = meshBuffer;

        if (this.ia) {
            this.ia.destroy();
            this.ia = null;
        }

        if (this._bufferBatch) {
            this.ia = this._bufferBatch.batcher.device.createInputAssembler({
                attributes: this._bufferBatch.attributes!,
                vertexBuffers: [this._bufferBatch.vb!],
                indexBuffer: this._bufferBatch.ib!,
            });
        }
    }
}
