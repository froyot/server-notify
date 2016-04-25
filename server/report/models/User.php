<?php
/**
 * 用户操作类，所有对用户的基本操作在该文件中实现
 */
namespace app\report\models;
use LeanCloud\LeanQuery;
use LeanCloud\LeanUser;
use Yii;

class User extends LeanUser implements \yii\web\IdentityInterface {
	const USER_IDENTIFY_KEY = '__USER_';
	public static function getRegisteredClassName() {
		return "_user";
	}
	/**
	 * @inheritdoc
	 */
	public static function findIdentity($id) {

		$userData = Yii::$app->session->get(User::USER_IDENTIFY_KEY . $id);
		if ($userData) {
			$user = new User($userData['_className'], $id);
			$user->setUsername($userData['username']);
			$user->setEmail($userData['email']);
		} else {
			$query = new LeanQuery("_User");
			$leanUser = $query->get($id);
			$user = new User('_user', $id);
			$user->setUsername($leanUser->getUserName());
			$user->setEmail($leanUser->getEmail());
		}
		return $user;
	}

	/**
	 * @inheritdoc
	 */
	public static function findIdentityByAccessToken($token, $type = null) {
		return null;
	}

	/**
	 * @inheritdoc
	 */
	public function getId() {
		return $this->getObjectId();
	}

	/**
	 * @inheritdoc
	 */
	public function getAuthKey() {
		return '';
	}

	/**
	 * @inheritdoc
	 */
	public function validateAuthKey($authKey) {
		return false;
	}

	public function setSession() {
		Yii::$app->session->set(User::USER_IDENTIFY_KEY . $this->getId(), $this->toArray());
	}

	public function toArray() {
		return [
			'id' => $this->getId(),
			'username' => $this->getUsername(),
			'email' => $this->getEmail(),
			'_className' => '_user',
		];
	}

	public function getCurrentApp() {
		$apps = App::getUserApps($this->getId());
		if ($apps) {
			foreach ($apps as $app) {
				if ($app->getObjectId() == CacheHandler::get('current_app_id')) {
					return $app;
				}
			}
			return $apps[0];
		}
		return null;
	}

	public function getApps() {
		$apps = App::getUserApps($this->getId());
		return $apps;
	}

	public function changeCurrentApp($appId) {
		$apps = App::getUserApps($this->getId());
		if ($apps) {
			foreach ($apps as $app) {
				if ($app->getObjectId() == $appId) {
					CacheHandler::set('current_app_id', $appId);
					return;
				}
			}
			CacheHandler::set('current_app_id', $apps[0]->getObjectId());
		}
		return null;
	}

}
