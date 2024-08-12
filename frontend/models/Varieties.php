<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "varieties".
 *
 * @property int $id
 * @property string $name
 * @property int|null $crop_type_id
 *
 * @property CropTypes $cropType
 * @property PlantingEntries[] $plantingEntries
 */
class Varieties extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'varieties';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['crop_type_id'], 'integer'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
            [['crop_type_id'], 'exist', 'skipOnError' => true, 'targetClass' => CropTypes::class, 'targetAttribute' => ['crop_type_id' => 'id']],
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
            'crop_type_id' => 'Crop Type ID',
        ];
    }

    /**
     * Gets query for [[CropType]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCropType()
    {
        return $this->hasOne(CropTypes::class, ['id' => 'crop_type_id']);
    }

    /**
     * Gets query for [[PlantingEntries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPlantingEntries()
    {
        return $this->hasMany(PlantingEntries::class, ['variety_id' => 'id']);
    }
}
