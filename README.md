## `CLI`

### @`http://pm2.keymetrics.io/docs/usage/quick-start/`

### 启动

```shell
# 开发环境
pm2 start ecosystem.config.js --env development

# 生产环境
pm2 start ecosystem.config.js --env production
```


### 重启

```shell
# pm2 reload <App name>
pm2 reload AD-SERVER

# pm2 reload <process id>
pm2 reload 0

# pm2 reload all processes
pm2 reload all
```

### 停止

```shell
# pm2 stop <App name>
pm2 stop AD-SERVER

# pm2 stop <process id>
pm2 stop 0

# pm2 stop all processes
pm2 stop all
```

### 删除

```shell
# pm2 delete <App name>
pm2 delete AD-SERVER

# pm2 delete <process id>
pm2 delete 0

# pm2 delete all processes
pm2 delete all
```

### 日志 `<pm2-logrotate>`

#### @`https://github.com/keymetrics/pm2-logrotate`

```shell
# 启动 pm2 install <package-name>
pm2 install pm2-logrotate

# 停止
pm2 uninstall pm2-logrotate

# 反转
pm2 reloadLogs
```

## package

- [ ] node [8.6.0]()
- [ ] express [4.16.0]()
- [ ] express-generator
- [ ] mongoose [5.1.3]()
- [ ] express-session [1.15.6]()
- [ ] joi [13.3.0]()
- [ ] nodemon
- [ ] postman
- [ ] pm2
- [ ] pm2-logrotate

## 解决日志中`ANSI colors/styles`

```
(log).replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
```

## `api`

## `User`

## `/api/adUsers`

```
获取所有用户信息
Method: Get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|  － |  － | －  |

## `/api/adUsers?userName=test`

```
获取所有用户信息
Method: Get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|userName|用户名|可模糊查询|

## `/api/adUsers`

```
获取所有用户信息
Method: Post

如果是新用户就创建新用户
如果用户已存在就更新用户
```

###### 字段
|字段|说明|备注|
|-|-|-|
|userName|用户名|英文名|
|commonName|   |中文名|
|employeeID   |   |工号|
|password   |   |密码|
|phone   |   |手机|
|company   |   | 公司|
|department   |   | 部门|
|title   |   |职务|
|facsimileTelephoneNumber   |   |传真|
|mobile   |   | 手机号码|
|streetAddress   |   | 地址|
|description   |   |-|
|    location   ||-|
|    email   | | -|


## `/api/adUsers/enable`

```
启用用户
Method: Post
```

###### 字段
|字段|说明|备注|
|-|-|-|
|userName|用户名|英文名|

## `/api/adUsers/disable`

```
启用用户
Method: Post
```

###### 字段
|字段|说明|备注|
|-|-|-|
|userName|用户名|英文名|

## `OU`



## `/api/adOU`

```
获取OU
Method: Get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|-|-|-|

## `/api/adOU?name=部门名称`

```
获取OU
Method: Get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name|部门名称|-|

## `/api/adOU`

```
创建部门
Method: Post
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name|部门名称|-|
|location   | 指定在哪个部门下| -  |

## `/api/adou/exists`

```
判断部门是否存在
Method: Get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name|部门名称|-|

## `/api/adou/remove`

```
删除部门
Method: Post
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name|部门名称|-|

## `group`

### `/api/adgroup`

```
获取所有组
Method: get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|-|-|-|

### `/api/adgroup`

```
获取指定组
Method: get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name|组名称|-|

### `/api/adgroup/exists`

```
组名称是否已存在
Method: get
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name|组名称|-|

### `/api/adgroup/remove`

```
删除组
Method: POST
```

###### 字段
|字段|说明|备注|
|-|-|-|
|name   | 组名称  |  - |

### `/api/adgroup/user`

```
往group中添加用户
Method: POST
```

###### 字段
|字段|说明|备注|
|-|-|-|
|gname   | 组名称  |   |
|uname|用户名(英文名)|-|

### `/api/adgroup/user/remove`

```
从group中删除用户
Method: POST
```

###### 字段
|字段|说明|备注|
|-|-|-|
|gname   | 组名称  |   |
|uname|用户名(英文名)|-|
