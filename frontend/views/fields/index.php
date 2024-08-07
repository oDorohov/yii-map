<?php

use frontend\models\Fields;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\widgets\ListView;
use yii\widgets\Pjax;
/** @var yii\web\View $this */
/** @var frontend\models\search\FieldsSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Fields';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="fields-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?php //Html::a('Create Fields', ['create'], ['class' => 'btn btn-success']) ?>
		<?= Html::a('Создать поле', ['#'], ['class' => 'btn btn-success','onClick' => 'createField();']) ?>
    </p>


    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>
		<?=ListView::widget([
			'dataProvider'=>$dataProvider,
			'itemView'=>'item', 
			'summary'=>false,
		])
	?>


</div>
