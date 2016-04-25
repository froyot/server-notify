<?php

namespace app\report\controllers\api;

use app\report\models\forms\MessageForm;
use Yii;
use yii\base\Model;
use yii\rest\Controller;

class MessageController extends Controller {
	public function actionSend() {
		$messageForm = new MessageForm();
		if (Yii::$app->request->getIsPost()) {
			$messageForm->load(Yii::$app->request->post(), '');
			if ($messageForm->validate() && $messageForm->send()) {
				return true;
			}
			return $messageForm;
		}
		return false;
	}

	public function actionSendTest() {
		$messageForm = new MessageForm();
		if (Yii::$app->request->getIsPost()) {
			$data['type'] = 'test';
			$data['title'] = '测试消息';
			$data['sort_msg'] = '你有新的测试消息 ' . date('Y-m-d H:i:s');
			$data['state'] = 'tab.message';
			$data['msg'] = ['time' => time(), "from" => Yii::$app->request->hostInfo, 'content' => '测试内容'];
			$data = array_merge(Yii::$app->request->post(), $data);
			$messageForm->load($data, '');
			if ($messageForm->validate() && $messageForm->send()) {
				return true;
			}
			return $messageForm;
		}
		return false;
	}

	public function afterAction($action, $res) {
		if ($res === false) {
			$res = ['status' => false];
		} elseif ($res === null) {
			$res = ['status' => true, 'data' => (object) null];
		} elseif ($res instanceOf Model && $res->hasErrors()) {
			$res = ['status' => false, 'error' => $res->errors];
		} else {
			$res = ['status' => true, 'data' => $res];
		}

		return parent::afterAction($action, $res);
	}
}
