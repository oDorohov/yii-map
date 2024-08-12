<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var frontend\models\PlantingEntries $model */

$this->title = 'Create Planting Entries';
$this->params['breadcrumbs'][] = ['label' => 'Planting Entries', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="planting-entries-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
