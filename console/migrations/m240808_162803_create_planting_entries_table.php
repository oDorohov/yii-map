<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%planting_entries}}`.
 */
class m240808_162803_create_planting_entries_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('planting_entries', [
            'id' => $this->primaryKey(),
            'variety_id' => $this->integer()->notNull(),
            'field_id' => $this->integer()->notNull(),
            'sowing_date' => $this->date()->notNull(),
            'quantity' => $this->decimal(10, 2),
        ]);

        $this->addForeignKey(
            'fk-planting_entries-variety_id',
            'planting_entries',
            'variety_id',
            'varieties',
            'id',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-planting_entries-field_id',
            'planting_entries',
            'field_id',
            'fields',
            'id',
        );
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk-planting_entries-variety_id', 'planting_entries');
        $this->dropForeignKey('fk-planting_entries-field_id', 'planting_entries');
        $this->dropTable('planting_entries');
    }
}
