import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPastesTable1786000425111 implements MigrationInterface {
  name = 'InitPastesTable1786000425111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_pastes_created_at"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "idx_pastes_created_at" ON "pastes" USING btree ("created_at") `,
    );
  }
}
