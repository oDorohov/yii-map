<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "crop_types".
 *
 * @property int $id
 * @property string $name
 *
 * @property Varieties[] $varieties
 */
class CropTypes extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'crop_types';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
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
        ];
    }

    /**
     * Gets query for [[Varieties]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getVarieties()
    {
        return $this->hasMany(Varieties::class, ['crop_type_id' => 'id']);
    }
}
