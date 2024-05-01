import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSprintTable1714607185642 implements MigrationInterface {
  name = 'AddSprintTable1714607185642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sprint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying(30) NOT NULL, "subTitle" character varying(100) NOT NULL, "slug" character varying(10) NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, CONSTRAINT "UQ_4fd3e6c037012f67b4f4d6311a7" UNIQUE ("slug"), CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sprint"`);
  }
}
