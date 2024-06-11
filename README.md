# uniapp-demo
包含登录和强更
cd uniapp-demo
yarn or npm install


#如需增加h5多环境，可以在package.json下增加一下代码：
```
"uni-app": {
		"scripts": {
			"dev:h5":{
				"title": "h5—开发环境",
				"env": {
					"VUE_APP_ENV_TYPE": "dev",
					"UNI_PLATFORM": "h5"
				}
			},
			"test:h5":{
				"title": "test—测试环境",
				"env": {
					"VUE_APP_ENV_TYPE": "test",
					"UNI_PLATFORM": "h5"
				}
			},
			"uat:h5":{
				"title": "h5—uat环境",
				"env": {
					"VUE_APP_ENV_TYPE": "uat",
					"UNI_PLATFORM": "h5"
				}
			},
			"prod:h5":{
				"title": "h5—正式环境",
				"env": {
					"VUE_APP_ENV_TYPE": "prod",
					"UNI_PLATFORM": "h5"
				}
			},
			"dev:wx": {
				"title": "微信小程序—开发环境",
				"env": {
					"VUE_APP_ENV_TYPE": "dev",
					"UNI_PLATFORM": "mp-weixin"
				},
				"define": {
					"MP-WEIXIN": true
				}
			},
			"test:wx": {
				"title": "微信小程序—测试环境",
				"env": {
					"VUE_APP_ENV_TYPE": "test",
					"UNI_PLATFORM": "mp-weixin"
				},
				"define": {
					"MP-WEIXIN": true
				}
			},
			"stage:wx": {
				"title": "微信小程序—stage环境",
				"env": {
					"VUE_APP_ENV_TYPE": "stage",
					"UNI_PLATFORM": "mp-weixin"
				},
				"define": {
					"MP-WEIXIN": true
				}
			},
			"prod:wx": {
				"title": "微信小程序—生产环境",
				"env": {
					"VUE_APP_ENV_TYPE": "production",
					"UNI_PLATFORM": "mp-weixin"
				},
				"define": {
					"MP-WEIXIN": true
				}
			}
		}
	}
```
