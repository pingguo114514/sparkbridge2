# 正则表达式的命令

>有关更多正则表达式规范，可以去百度或者哔哩哔哩学习。

## reply

向匹配成功的群聊回复消息

示例
```
reply|你好
```

## f

发送私聊消息

示例
```
f|12345678:哈哈哈哈
```

向好友`12345678`好友发送`哈哈哈哈`

## g

发送群聊消息

示例
```
g|12345678:哈哈哈哈
```

向群聊`12345678`发送`哈哈哈哈`

## run

向服务器执行命令

示例
``` 
run|list
```

向服务器执行`list`命令

## t

向服务器里面发送信息

示例
```
t|lition:nmsl 
```
向`lition`发送`nmsl`
```
t|all:nmsl
```
向所有人发送`nmsl`

## addwl

向服务器添加白名单

示例
``` 
addwl|Lition:true
```

向服务器添加白名单Lition


## remwl

向服务器删除白名单

示例
``` 
remwl|Lition
```

向服务器移除白名单Lition


# 占位符

|变量|含义|
|:-:|:-:|
|%USER_NAME%|发信人QQ昵称|
|%USER_CARD%|发信人群昵称|
|%USER_XBOXID%|发信人绑定的游戏ID|

可直接在正则表达式中调用变量。
如：
``` json
//spark.regex的config.json中的示例：
{
    "^我是(.+)":{
        "cmd":"reply|你是$1",
        "adm":false
    }
}
```
此时群里发送“我是%USER_XBOXID%”
返回“你是xxxxxxx”（发信人绑定的游戏ID）

Tips:你可以在开发文档中找到一写关于自定义占位符的内容

## [-->常见问题](/subpages/qa.md)
