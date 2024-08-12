<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%crop_types}}`.
 */
class m240808_161706_create_crop_types_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%crop_types}}', [
            'id' => $this->primaryKey(),
			'name'=> $this->string()->notNull()->unique(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%crop_types}}');
    }
}
