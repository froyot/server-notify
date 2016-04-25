<?php

namespace app\report\models\forms;

use app\report\models\LeanCloudErrorHandler;
use LeanCloud\LeanObject;
use LeanCloud\LeanPush;
use LeanCloud\LeanQuery;
use Yii;
use yii\base\Model;

class MessageForm extends Model {

	public $secure_key;
	public $user_id;
	public $type;
	public $title;
	public $sort_msg;
	public $msg;
	public $state = '';

	public function rules() {
		return [
			[['secure_key', 'user_id', 'type', 'sort_msg', 'title'], 'required'],
			[['msg', 'state'], 'safe'],
		];
	}

	public function checkSecure() {
		$query = new LeanQuery('_User');
		$user = $query
			->equalTo("objectId", $this->user_id)
			->first();

		if ($user && $user->get('secure_key') == $this->secure_key) {
			return true;
		}
		return false;
	}

	public function send() {
		if (!$this->checkSecure()) {
			$this->addError('secure_key', 'secure_key check error');
			return false;
		}
		//添加消息
		$obj = new LeanObject('message');
		$obj->set("title", $this->title);
		$obj->set("user_id", $this->user_id);
		$obj->set("sort_msg", $this->sort_msg);
		$obj->set("type", $this->type);
		$obj->set("msg", $this->msg);
		try {
			$obj->save();
			$this->pushNotify($obj);
			return true;
		} catch (CloudException $ex) {
			$error = LeanCloudErrorHandler::handelError($ex);
			Yii::error($error);
			$this->addError('msg', 'msg send exception');
			// CloudException 会被抛出，如果保存失败
			return false;
		}
		//推送消息
	}

	private function pushNotify($obj) {
		Yii::trace($obj);
		$data = [
			'state' => $this->state,
			'alert' => $this->sort_msg, 'title' => $obj->get('title'), 'sortMsg' => $obj->get('sort_msg'), 'type' => $this->type];
		$query = new LeanQuery('_user');
		$user = $query->get($this->user_id);

		if ($user) {
			$push = new LeanPush($data, ['where' => (new LeanQuery('_Installation'))->equalTo('installationId', $user->get('installationId'))]);
			$push->send();
		}

	}
}
