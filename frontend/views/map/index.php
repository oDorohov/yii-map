<?php
use yii\widgets\Pjax;
use yii\helpers\Html;
?>

<?php Pjax::begin([
	'id'=>'fieldsList',
	'timeout'=>false, 
	'enablePushState'=>false,
	'enableReplaceState' => false,
	'clientOptions' => ['container' => '#container-sidebar']
]); ?>
 

<div id="right-sidebar" style="position: fixed;z-index: 1;right: 0px;top: 0px;margin-right: 10px;">

	<br>
	<p>
		<?= Html::a('Fields', ['/fields/index'], ['class' => 'btn btn-primary']) ?>
		<?= Html::a('Fields', ['/fields/index'], ['class' => 'btn btn-primary']) ?>
		<?= Html::a('Fields', ['/fields/index'], ['class' => 'btn btn-primary']) ?>
	</p>
</div>


<div id="left-sidebar" style="position: fixed;z-index: 1;left: 0px;top: 0px;margin-right: 10px;">
<div id="container-sidebar"></div>
</div>

<div id ="map"style="height: 100vH; width: 100vW;top:0;left:0;z-index:-1"> </div>

<?php Pjax::end();?>