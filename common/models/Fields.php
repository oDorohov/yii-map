<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "fields".
 *
 * @property int $id
 * @property string $name
 * @property float|null $square
 * @property string|null $coordinates
 */
class Fields extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'fields';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['square'], 'number'],
            [['coordinates'], 'string'],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'square' => 'Square',
            'coordinates' => 'Coordinates',
        ];
    }
}
