<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var frontend\models\PlantingEntries $model */

$this->title = 'Update Planting Entries: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Planting Entries', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="planting-entries-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
