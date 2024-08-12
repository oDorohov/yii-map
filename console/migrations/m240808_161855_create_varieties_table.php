<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%varieties}}`.
 */
class m240808_161855_create_varieties_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%varieties}}', [
            'id' => $this->primaryKey(),
			'name'=> $this->string()->notNull()->unique(),
			'crop_type_id'=>$this->integer(),
        ]);
		
		$this->addForeignKey('fk-varieties-crop_type_id','varieties','crop_type_id','crop_types','id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%varieties}}');
    }
}
