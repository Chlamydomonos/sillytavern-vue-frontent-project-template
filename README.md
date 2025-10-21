# SillyTavern Vue前端插件示例项目

## 安装依赖

运行`npm install`。

也可以使用yarn，pnpm等包管理器。

## 启动开发服务器

运行`npm run dev`。开发服务器将在5173端口启动。

开发服务器只能用于快速调试外观，关于酒馆的各项功能无法使用。

修改`public/message.txt`以改变开发服务器中显示的消息。

## 构建项目

运行`npm run build`。

构建项目后，在酒馆Vue插件的设置页面点击“上传Vue前端到世界书”按钮即可把Vue前端上传到角色世界书。（需要先手动为角色创建世界书。）

上传Vue前端时，需要在弹出的资源管理器页面中选择构建出的`dist`文件夹。

## 使用VSCode调试

构建项目并上传到角色世界书。之后，运行`launch.json`中定义的“调试Vue前端”任务。在弹出的浏览器中打开角色卡，即可添加断点并调试。（如果你的酒馆监听的端口不为8000，需要在`launch.json`中修改。）

## 以Release模式构建

运行`npm run build:release`。

在发布角色卡之前，建议以Release模式构建并重新上传前端。这会大大减小角色卡大小。

## 更新插件版本

运行`npm run update-plugin`。

如果Vue前端插件有新版本，运行该命令可以把项目依赖的Vue前端插件也更新到最新版。

## 更新酒馆助手版本

运行`npm run setup-tavern-helper`。

如果酒馆助手有新版本，运行该命令可以自动更新酒馆助手类型声明文件。

查看[Vue前端插件 README](https://github.com/Chlamydomonos/sillytavern-vue-frontend/blob/main/README.md)以获得更多信息。
