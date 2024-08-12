<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "planting_entries".
 *
 * @property int $id
 * @property int $variety_id
 * @property int $field_id
 * @property string $sowing_date
 * @property float|null $quantity
 *
 * @property Fields $field
 * @property Varieties $variety
 */
class PlantingEntries extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'planting_entries';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['variety_id', 'field_id', 'sowing_date'], 'required'],
            [['variety_id', 'field_id'], 'integer'],
            [['sowing_date'], 'safe'],
            [['quantity'], 'number'],
            [['field_id'], 'exist', 'skipOnError' => true, 'targetClass' => Fields::class, 'targetAttribute' => ['field_id' => 'id']],
            [['variety_id'], 'exist', 'skipOnError' => true, 'targetClass' => Varieties::class, 'targetAttribute' => ['variety_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'variety_id' => 'Variety ID',
            'field_id' => 'Field ID',
            'sowing_date' => 'Sowing Date',
            'quantity' => 'Quantity',
        ];
    }

    /**
     * Gets query for [[Field]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getField()
    {
        return $this->hasOne(Fields::class, ['id' => 'field_id']);
    }

    /**
     * Gets query for [[Variety]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getVariety()
    {
        return $this->hasOne(Varieties::class, ['id' => 'variety_id']);
    }
}
