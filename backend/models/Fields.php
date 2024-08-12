<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "fields".
 *
 * @property int $id
 * @property string|null $name
 * @property float|null $square
 * @property string|null $coordinates
 *
 * @property PlantingEntries[] $plantingEntries
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

    /**
     * Gets query for [[PlantingEntries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPlantingEntries()
    {
        return $this->hasMany(PlantingEntries::class, ['field_id' => 'id']);
    }
}
