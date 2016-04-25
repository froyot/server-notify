<?php

namespace app\report\controllers;

use app\report\models\forms\LoginForm;
use Yii;
use yii\web\Controller;

class DefaultController extends Controller {
	public $layout = 'main';
	public function actionIndex() {

		return $this->render('index');
	}

	public function actionLogin() {
		$model = new LoginForm();
		if (Yii::$app->request->getIsPost()) {
			if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->login()) {
				return $this->redirect(['default/index']);exit;
			}
		}
		return $this->render('login', ['model' => $model]);
	}

	public function actionRegister() {
		$model = new LoginForm();
		$model->setScenario('register');
		if (Yii::$app->request->getIsPost()) {
			if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->register()) {
				return $this->redirect(['default/login']);exit;
			}
		}
		return $this->render('register', ['model' => $model]);
	}

	public function actionLogout() {
		$model = new LoginForm();

		$model->logout();
		return $this->redirect(['default/login']);exit;

	}
}
