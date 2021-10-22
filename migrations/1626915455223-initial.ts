import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1626915455223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adni Image
    await queryRunner.query(
      'CREATE TABLE `adni_image` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `imageUid` int NOT NULL, \
              `rid` int NOT NULL, \
              `examDate` datetime NOT NULL, \
              `visCode` varchar(16) NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_adni_image` (`imageUid`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB'
    );

    // Phenotype
    await queryRunner.query(
      'CREATE TABLE `phenotype` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `imageUid` int NOT NULL, \
              `value` int NOT NULL, \
              `brainPartKeyname` varchar(128) NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_adni_image_brainPartKeyname` (`imageUid`, `brainPartKeyname`), \
              INDEX `IDX_phenotype_brainPartKey` (`brainPartKeyname`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB'
    );

    await queryRunner.query(
      'ALTER TABLE `phenotype` \
            ADD CONSTRAINT `IDX_phenotype_image` \
            FOREIGN KEY (`imageUid`) REFERENCES `adni_image`(`imageUid`) \
            ON DELETE CASCADE ON UPDATE NO ACTION'
    );

    // Patient
    await queryRunner.query(
      'CREATE TABLE `patient` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `ptid` varchar(14) NOT NULL, \
              `rid` varchar(14) NOT NULL, \
              `diagnosis` varchar(4) NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_patient_ptid` (`ptid`), \
              UNIQUE INDEX `IDX_patient_rid` (`rid`), \
              INDEX `IDX_patient_diagnosis` (`diagnosis`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB'
    );

    // PatientVisit
    await queryRunner.query(
      'CREATE TABLE `patient_visit` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `rid` int NOT NULL, \
              `imageUid` int NOT NULL, \
              `visit` varchar(14) NOT NULL, \
              `scanDate` datetime NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_patient_visit_rid` (`rid`, `imageUid`), \
              INDEX `IDX_patient_visit_imageUid` (`imageUid`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB'
    );

    // BrainPart
    await queryRunner.query(
      'CREATE TABLE `brain_part` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `keyname` varchar(14) NOT NULL, \
              `humanName` varchar(256) NOT NULL, \
              `dictionary` varchar(128) NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_brain_part_keyname_dict` (`keyname`,`dictionary`), \
              INDEX `IDX_brain_part_dictionary` (`dictionary`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `phenotype`');
    await queryRunner.query('DROP TABLE `patient_visit`');
    await queryRunner.query('DROP TABLE `patient`');
    await queryRunner.query('DROP TABLE `adni_image`');
    await queryRunner.query('DROP TABLE `brain_part`');
  }
}
