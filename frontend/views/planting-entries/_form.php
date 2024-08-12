<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var frontend\models\PlantingEntries $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="planting-entries-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'variety_id')->textInput() ?>

    <?= $form->field($model, 'field_id')->textInput() ?>

    <?= $form->field($model, 'sowing_date')->textInput() ?>

    <?= $form->field($model, 'quantity')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
