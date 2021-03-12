import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCustomerIdToOrders1615584057297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true, //caso delete o usuario o orders vao continuar
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'orders_customer',
        columnNames: ['customer_id'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', //quando customer for deletado este campo ficara nulo
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'orders_customer');
    await queryRunner.dropColumn('orders', 'customer_id');
  }
}
