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
exports.Patient = void 0;
const diagnosis_enum_1 = require("../enums/diagnosis.enum");
const typeorm_1 = require("typeorm");
const adni_image_entity_1 = require("./adni-image.entity");
let Patient = class Patient extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Patient.prototype, "diagnosis", void 0);
__decorate([
    typeorm_1.OneToMany(() => adni_image_entity_1.AdniImage, image => image.patient),
    __metadata("design:type", Array)
], Patient.prototype, "adniImages", void 0);
Patient = __decorate([
    typeorm_1.Entity()
], Patient);
exports.Patient = Patient;
//# sourceMappingURL=patient.entity.js.map