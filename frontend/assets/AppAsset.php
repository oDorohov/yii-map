<?php

namespace frontend\assets;

use yii\web\AssetBundle;
use Yii;
/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
    ];
    public $js = [
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap5\BootstrapAsset',
		'frontend\assets\OlAsset',
    ];
	
	public function init(){
    	if(Yii::$app->controller->id="map"){
    		$this->js[]="js/ol.js";
    		$this->js[]="js/map.js";
			$this->js[]="js/createField.js";
			
			$this->css[]="css/map.css";
    	} 
    	return parent::init();
    }
}
