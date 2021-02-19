/* 引入express框架 */
const express = require('express');
const app = express();

//设置跨域访问
// app.all("*", function (req, res, next) {
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin", "*");
//     //允许的header类型
//     res.header("Access-Control-Allow-Headers", "content-type");
//     //跨域允许的请求方式 
//     res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//     if (req.method.toLowerCase() == 'options')
//         res.send(200); //让options尝试请求快速结束
//     else
//         next();
// })

/* 引入cors */
const cors = require('cors');
app.use(cors());

/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

/* 引入请求三方方法 */
var request = require('request');

/* 引入mysql */
const mysql = require('mysql');
const connection = mysql.createConnection({

})

connection.connect((res) => {
	if (res) throw res;
	console.log('——————————链接成功——————————');
});

/* 监听端口 */
app.listen(3306, () => {
	console.log('——————————服务已启动——————————');
})

const baseURL = '/api'

// login 登录
app.post(`${baseURL}/login`, (req, res) => {
	connection.query(`select * FROM user where account="${req.body.account}"`, (error, results) => {
		if (error) throw error;
		if (results.length == 0) {
			res.json({
				code: 10001,
				message: '该用户未注册'
			})
		} else {
			connection.query(`select * FROM user where account="${req.body.account}"`, (error,results) => {
				if (error) throw error;
				if(results[0].del_flag){
					res.json({
						code: -1,
						message: '该账户已删除，请联系管理员'
					})
					return
				}
				if(results[0].lock_flag){
					res.json({
						code: -1,
						message: '该账户已锁定，请联系管理员'
					})
					return
				}
				if(results[0].account == req.body.account && results[0].password == req.body.password){
					res.json({
						code: 0,
						data: results[0],
						message: 'success'
					})
				}else {
					res.json({
						code: -1,
						message: '用户名或密码错误'
					})
				}
			})
		}
	})
})

// 注册
app.post(`${baseURL}/register`, (req, res) => {
	connection.query(`select * FROM user where account="${req.body.account}"`, (error, results) => {
		if (error) throw error;
		if (results.length > 0) {
			res.json({
				code: 10001,
				message: '账号已存在'
			})
		} else {
			connection.query(`INSERT INTO user(username,password,account) values('${req.body.username}','${req.body.password}','${req.body.account}')`, (error) => {
				if (error) return res.json({
					code: 10001,
					data: error,
					message: '注册失败'
				})
				res.json({
					code: 0,
					message: '恭喜您，注册成功'
				})
			})
		}
	})
})

// 获取用户信息
app.get(`${baseURL}/user`, (req, res) => {
	console.log(req.body)
	const sqlStr = `SELECT * FROM user where id=${req.body.id}`
	connection.query(sqlStr, (error, results) => {
		if (error) return res.json({
			code: 10001,
			message: error
		})
		res.json({
			code: 0,
			data: results
		})
	})
})

// 修改获取用户信息
app.put(`${baseURL}/user`, (req, res) => {
	const sqlStr = `update user set avatar="${req.body.avatar}" where id=${req.body.id};`
	connection.query(sqlStr, (error) => {
		if (error) {
			res.json({
				code: 10001,
				data:error,
				message: '更新失败'
			})
		}else {
			connection.query(	`SELECT * FROM user where id=${req.body.id};`, (error, results) => {
				if (error) return res.json({
					code: 10001,
					message: error
				})
				res.json({
					code: 0,
					data: results[0],
					message: '修改成功'
				})
			})
		}
	})
})

// 获取三方假期数据
app.get(`${baseURL}/holiday`, () => {
	request('https://tianqiapi.com/api?version=v6&appid=61766418&appsecret=7IIFrTTa', function (err, response, body) {
		if (!err && response.statusCode == 200) {
			let res = JSON.parse(body);
			console.log('holiday', res)
			res.json({
				code: 0,
				data: res,
				message: '成功'
			})
		}
	})
})
app.get(`${baseURL}/get`, (req, res) => {
	const sqlStr = 'SELECT * FROM todo'
	connection.query(sqlStr, (error, results) => {
		if (error) return res.json({
			code: 10001,
			message: error
		})
		res.json({
			code: 0,
			data: results
		})
	})
})
app.get(`${baseURL}/set`, (req, res) => {
	connection.query("INSERT INTO todo SET ?", req.query, (error, results, fields) => {
		if (error) throw error;
		res.json({
			code: 0,
			message: '成功'
		})
	})
})
app.post(`${baseURL}/postSet`, (req, res) => {
	connection.query("INSERT INTO todo SET ?", req.body, (error, results, fields) => {
		if (error) throw error;
		res.json({
			code: 0,
			message: '成功'
		})
	})
})
app.get(`${baseURL}/getById`, (req, res) => {
	connection.query(`SELECT * FROM todo where id=${req.query.id}`, (error, results, fields) => {
		if (error) throw error;
		res.json({
			code: 0,
			message: results
		})
	})
})

app.get(`${baseURL}/del`, (req, res) => {
	connection.query(`delete FROM todo where id=${req.query.id}`, (error, results, fields) => {
		if (error) throw error;
		res.json({
			code: 0,
			message: results
		})
	})
})
app.post(`${baseURL}/update`, (req, res) => {
	connection.query(`update todo set name="${req.body.name}" where id=${req.body.id};`, (error, results, fields) => {
		if (error) throw error;
		res.json({
			code: 0,
			message: results
		})
	})
})