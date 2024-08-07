<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class OlAsset extends AssetBundle
{
    public $sourcePath = '@npm';
   
    public $js = [
		'ol/dist/ol.js'
    ];

}
