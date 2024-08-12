<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%fields}}`.
 */
class m240805_162042_create_fields_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%fields}}', [
            'id' => $this->primaryKey(),
			'name'=>$this->string(),
			'square'=>$this->float(),
			'coordinates'=>'polygon',
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%fields}}');
    }
}
