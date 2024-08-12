<?php

namespace frontend\models;

use Yii;
use yii\db\Expression;

/**
 * This is the model class for table "fields".
 *
 * @property int $id
 * @property string $name
 * @property float|null $square
 * @property string|null $coordinates
 */
class Fields extends \common\models\Fields
{

	public function beforeSave($insert) 
   { 
       if (!parent::beforeSave($insert)) { 
           return false; 
       }
       $this->coordinates = new Expression( "ST_PolygonFromText('POLYGON((".$this->coordinates ."))',0)"); 
       return true; 
   }

}
