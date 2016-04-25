<?php
use yii\bootstrap\ActiveForm;
use yii\helpers\Html;
/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model app\models\LoginForm */

$this->title = Yii::t('app/report', 'create-app');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-login">
    <h1><?=Html::encode($this->title)?></h1>



    <?php $form = ActiveForm::begin([
	'id' => 'create-app-form',
	'options' => ['class' => 'form-horizontal'],
	'fieldConfig' => [
		'template' => "{label}\n<div class=\"col-lg-3\">{input}</div>\n<div class=\"col-lg-8\">{error}</div>",
		'labelOptions' => ['class' => 'col-lg-1 control-label'],
	],
]);?>

    <?=$form->field($model, 'name')->label(Yii::t('app/report', 'username'))?>

    <div class="form-group">
        <div class="col-lg-offset-1 col-lg-11">
            <?=Html::submitButton(Yii::t('app/report', 'create'), ['class' => 'btn btn-primary', 'name' => 'login-button'])?>
        </div>
    </div>

    <?php ActiveForm::end();?>

</div>
