<?php

namespace app\report\models;

class LeanCloudErrorHandler {
	public static function handelError($ex) {
		$message = $ex->getMessage();
		//匹配error:{"code":"200","message":""}

		$preg = "/error\"\:\{\"code\"\:(\d*?),\"error\"\:\"(.*?)\"/is";
		preg_match($preg, $message, $match);
		if ($match) {
			return [
				'code' => $match[1],
				'message' => json_decode('"' . $match[2] . '"'),
			];
		} else {
			return [
				'code' => 0,
				'message' => 'unknow',
			];
		}
	}
}
