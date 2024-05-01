import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingAuthTable1714433563560 implements MigrationInterface {
  name = 'AddingAuthTable1714433563560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "token" character varying(255) NOT NULL, "expiresIn" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_f4aae9866cf436c5fb567f0d599" UNIQUE ("token"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`,
    );
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
