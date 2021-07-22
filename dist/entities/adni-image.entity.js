"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdniImage = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("./patient.entity");
let AdniImage = class AdniImage extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdniImage.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AdniImage.prototype, "imageUid", void 0);
__decorate([
    typeorm_1.ManyToOne(() => patient_entity_1.Patient, patient => patient.adniImages, { eager: false }),
    __metadata("design:type", patient_entity_1.Patient)
], AdniImage.prototype, "patient", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AdniImage.prototype, "patientId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], AdniImage.prototype, "examDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdniImage.prototype, "visCode", void 0);
AdniImage = __decorate([
    typeorm_1.Entity()
], AdniImage);
exports.AdniImage = AdniImage;
//# sourceMappingURL=adni-image.entity.js.map