import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskTable1714609435075 implements MigrationInterface {
  name = 'AddTaskTable1714609435075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."task_tags_enum" AS ENUM('backend', 'frontend')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_type_enum" AS ENUM('feat', 'fix', 'history')`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying(30) NOT NULL, "description" character varying(100), "slug" character varying(10) NOT NULL, "tags" "public"."task_tags_enum" array, "type" "public"."task_type_enum" NOT NULL DEFAULT 'feat', "sprintId" uuid, CONSTRAINT "UQ_64d11c5d03cab2cd880b36150e8" UNIQUE ("slug"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."task_tags_enum"`);
  }
}
