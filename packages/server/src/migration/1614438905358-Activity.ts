import {MigrationInterface, QueryRunner} from "typeorm";

export class Activity1614438905358 implements MigrationInterface {
    name = 'Activity1614438905358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "f_id" integer NOT NULL, CONSTRAINT "PK_9bc080b7bc181da2b57e9d9c7f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "action" character varying NOT NULL, "userId" uuid, "activityDataId" uuid, CONSTRAINT "REL_96f461e2a50f3175353773196c" UNIQUE ("activityDataId"), CONSTRAINT "PK_a7314c500ea63e9981c91dc03a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "activity_record" ADD CONSTRAINT "FK_0f8f194a669e3c8b05dc8f9554b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_record" ADD CONSTRAINT "FK_96f461e2a50f3175353773196c9" FOREIGN KEY ("activityDataId") REFERENCES "activity_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_record" DROP CONSTRAINT "FK_96f461e2a50f3175353773196c9"`);
        await queryRunner.query(`ALTER TABLE "activity_record" DROP CONSTRAINT "FK_0f8f194a669e3c8b05dc8f9554b"`);
        await queryRunner.query(`DROP TABLE "activity_record"`);
        await queryRunner.query(`DROP TABLE "activity_data"`);
    }

}
