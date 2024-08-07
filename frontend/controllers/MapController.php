<?php

namespace frontend\controllers;

class MapController extends \yii\web\Controller
{
	public $layout = '@frontend/views/layouts/map.php';
	
    public function actionIndex()
    {
        return $this->render('index');
    }

}
