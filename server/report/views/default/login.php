<?php
use yii\bootstrap\ActiveForm;
use yii\helpers\Html;
use yii\helpers\Url;
/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model app\models\LoginForm */

$this->title = Yii::t('app/report', 'login');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-login">
    <h1><?=Html::encode($this->title)?></h1>



    <?php $form = ActiveForm::begin([
	'id' => 'login-form',
	'options' => ['class' => 'form-horizontal'],
	'fieldConfig' => [
		'template' => "{label}\n<div class=\"col-lg-3\">{input}</div>\n<div class=\"col-lg-8\">{error}</div>",
		'labelOptions' => ['class' => 'col-lg-1 control-label'],
	],
]);?>

    <?=$form->field($model, 'username')->label(Yii::t('app/report', 'username'))?>

    <?=$form->field($model, 'password')->passwordInput()->label(Yii::t('app/report', 'password'))?>

    <div class="form-group">
        <div class="col-lg-offset-1 col-lg-11">
            <?=Html::submitButton(Yii::t('app/report', 'login'), ['class' => 'btn btn-primary', 'name' => 'login-button'])?>

            <?=Html::a(Yii::t('app/report', 'register'), Url::to(['default/register']), ['class' => 'btn btn-success', 'name' => 'register-button'])?>
        </div>
    </div>

    <?php ActiveForm::end();?>

</div>
