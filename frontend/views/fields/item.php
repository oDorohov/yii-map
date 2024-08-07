<?php

use yii\helpers\Html;
use yii\helpers\Url;

?>
<div class='field-info-list'>
	<div class="field-info-content">
		<div class="block-icon">
			<span class="icon-field" 
				onClick='addFields("<?=Url::to(['/fields/fields/','FieldYearSearch[id]'=>$model->id])?>")'
			> </span>
 
		</div>
		<div class="block-content">
			<div>
			<h4>
			<?= $model->name?>
			</h4>
			</div>



		</div>
	</div>
</div>
