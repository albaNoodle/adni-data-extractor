import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1626915455223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adni Image
        
        await queryRunner.query(
            'CREATE TABLE `adni_image` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `imageUid` int NOT NULL, \
              `patientId` int NOT NULL, \
              `examDate` datetime NOT NULL, \
              `visCode` varchar(16) NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_adni_image` (`imageUid`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB',
          );  
          
          await queryRunner.query(
            'CREATE TABLE `phenotype` ( \
              `id` int NOT NULL AUTO_INCREMENT, \
              `imageUid` int NOT NULL, \
              `value` int NOT NULL, \
              `brainPartKey` varchar(128) NOT NULL, \
              `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
              UNIQUE INDEX `IDX_adni_image_brainPartKey` (`imageUid`, `brainPartKey`), \
              INDEX `IDX_phenotype_brainPartKey` (`imageUid`, `brainPartKey`), \
              PRIMARY KEY (`id`) \
              ) ENGINE=InnoDB',
          ); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `phenotype`');
        await queryRunner.query('DROP TABLE `adni_image`');
    }

}
