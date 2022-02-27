






`事件`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    </style>
</head>
<body>
    <img  src="http://localhost:8000/red.png">

    <script>
        document.addEventListener("DOMContentLoaded",function () {
            console.log("DOMContentLoaded"+new Date()) 
        });
        // 当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发load事件。
        window.addEventListener("load",function () {
            console.log("load"+new Date()) 
        });
    </script>
</body>
</html>
```


* `DOMContentLoaded` - 页面DOM加载完成就触发，无需等待依赖资源的加载。

* `load` - 当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发load事件。


`img`会不会阻塞渲染？




`DOM解析不必等待底部的JS，渲染依旧需要等待`


`css加载不会DOM解析，会阻塞DOM渲染` - `03test.html`


`js加载会等待css嘛？` - `需要等待css加载，才可以加载js`,说明`css加载会阻塞后面js语句的执行`  - `04test.html`


`css会不会影响dom ready`  


* `若link下面无script标签或link上面存在scrit标签` - DOMContentLoaded事件无需等待CSS文件、图片加载完成。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script>
        document.addEventListener("DOMContentLoaded",function () {
            console.log("DOMContentLoaded"+new Date())
            // 这里color： rgb(0, 0, 0) 不是红色
            console.log(getComputedStyle(document.querySelector('h1'), null).color)
        });
    </script>
    <script>
        console.log('>>> execute script.')
    </script>
    <!--  该css延迟3s后，才可以加载 -->
    <link rel="stylesheet" type="text/css" href="http://localhost:8000/index.css"></link>

</head>
<body>
    <h1>h1</h1>
    <image src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"/>
</body>
</html>
```


* ``若link下面存在script标签且内容为空` -  - DOMContentLoaded事件无需等待CSS文件、图片加载完成。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <script>
         document.addEventListener("DOMContentLoaded",function () {
            console.log("DOMContentLoaded"+new Date())
            // 这里color： rgb(0, 0, 0) 不是红色
            console.log(getComputedStyle(document.querySelector('h1'), null).color)
        });
    </script>
    <script>
        console.log('>>> execute script.')
    </script>
    <!--  该css延迟3s后，才可以加载 -->
    <link rel="stylesheet" type="text/css" href="http://localhost:8000/index.css"></link>

</head>
<body>
    <h1>h1</h1>
    <image src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"/>
    <script></script>
</body>
</html>
```


* `若link下面存在script标签内容不为空` - DOMContentLoaded事件需要`等待JS执行完才触发`。而且`script标签`中的JS需要`等待`位于其`前面的CSS的加载完成`。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <script>
         document.addEventListener("DOMContentLoaded",function () {
            console.log("DOMContentLoaded"+new Date())
            // 这里color： rgb(255, 0, 0)  是红色
            console.log(getComputedStyle(document.querySelector('h1'), null).color)
        });
    </script>
    <script>
        console.log('>>> execute script.')
    </script>
    <!--  该css延迟3s后，才可以加载 -->
    <link rel="stylesheet" type="text/css" href="http://localhost:8000/index.css"></link>

</head>
<body>
    <h1>h1</h1>
    <image src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"/>
    <script>
        console.log('loading...')
    </script>
</body>
</html>
```


`参考`

* [DOMContentLoaded](https://cloud.tencent.com/developer/article/1132271?from=article.detail.1829843)
* [DOMContentLoaded](https://cloud.tencent.com/developer/article/1829843)
* [css加载会造成阻塞吗](https://www.cnblogs.com/chenjg/p/7126822.html)
