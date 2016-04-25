<?php
use app\assets\AppAsset;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage()?>
<!DOCTYPE html>
<html lang="<?=Yii::$app->language?>">
<head>
    <meta charset="<?=Yii::$app->charset?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?=Html::csrfMetaTags()?>
    <title><?=Html::encode($this->title)?></title>
    <?php $this->head()?>
</head>
<body>

<?php $this->beginBody()?>
    <div class="wrap">
        <?php
NavBar::begin([
	'brandLabel' => '服务通知',
	'brandUrl' => Yii::$app->homeUrl,
	'options' => [
		'class' => 'navbar-inverse navbar-fixed-top',
	],
]);
$childMap = [['label' => 'Login', 'url' => ['default/login']]];
if (!Yii::$app->user->isGuest) {
	$apps['items'] = [];
	foreach (Yii::$app->user->identity->getApps() as $app) {

		$apps['items'][] = ['label' => $app->get("name"), 'url' => ['app/index', 'app_id' => $app->getObjectId()]];
	}
	$apps['items'][] = ['label' => '添加app', 'url' => ['app/create']];
	$childMap = [
		[
			'label' => Yii::$app->user->identity->getUserName(),
			'items' => [
				['label' => Yii::t('app', 'logout') . '(' . Yii::$app->user->identity->getUserName() . ')',
					'url' => ['default/logout'],
					'linkOptions' => ['data-method' => 'post']],
				['label' => Yii::t('app', 'reset password'), 'url' => ['user/reset-password']],
			],
		],
		[
			'label' => Yii::$app->user->identity->getCurrentApp() ? Yii::$app->user->identity->getCurrentApp()->get("name") : '无',
			'items' => $apps['items'],
		],
	];

}
echo Nav::widget([
	'options' => ['class' => 'navbar-nav navbar-right'],
	'items' => ArrayHelper::merge([
		['label' => 'Home', 'url' => ['default/index']],
		['label' => 'About', 'url' => ['default/about']],
		['label' => 'Contact', 'url' => ['default/contact']],
	],
		$childMap),
]);
NavBar::end();
?>

        <div class="container">
            <?=Breadcrumbs::widget([
'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
])?>
            <?=$content?>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="pull-left">&copy; My Company <?=date('Y')?></p>
            <p class="pull-right"><?=Yii::powered()?></p>
        </div>
    </footer>

<?php $this->endBody()?>
</body>
</html>
<?php $this->endPage()?>
