<?php

namespace app\report;
use Yii;

class Module extends \yii\base\Module {
	public $controllerNamespace = 'app\report\controllers';

	public function init() {
		parent::init();
		\LeanCloud\LeanClient::initialize("app_id", "app_key", "Master Key");
		// custom initialization code goes here
		Yii::$app->setComponents(
			[
				'user' => [
					'class' => 'yii\web\User',
					'identityClass' => 'app\report\models\User',
					'enableAutoLogin' => true,
				],
				'request' => [
					'class' => 'yii\web\Request',
					'parsers' => [
						'application/json' => 'yii\web\JsonParser',
						'text/json' => 'yii\web\JsonParser',
					],
				],

			]);

	}
}
