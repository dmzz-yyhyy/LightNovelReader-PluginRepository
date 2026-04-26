# LightNovelReader 插件仓库

这是 [LightNovelReader 插件市场](https://plugins.nariko.org) 的官方插件仓库。

---

## 如何提交你的插件

### 0. 生成插件分发包

1. 前往 [插件分发包生成器](https://plugins.lnr.nariko.org/bundle-generator)
2. 填写插件元信息、资源文件及版本信息
3. 完成后点击「生成分发包」

生成的分发包包含插件发布所需的全部内容。你无需手动编辑这些信息。

---

### 1. 准备插件仓库

在提交插件前，你需要创建一个独立的 GitHub 仓库（或分支）用于存放插件分发文件。

- 将生成的分发包解压到仓库**根目录**
- 提交并推送所有文件
- 仓库必须为公开可访问

示例结构：

```
your-plugin-repo/

├── plugin.toml     # 插件元信息（必需）
├── plugin.lnrp     # 插件本体（必需）
├── icon.png        # 插件图标（必需）
└── ...             # 其他资源
```

后续所有插件更新均在上述仓库中进行。确保已经提交并推送插件和资源后再进行后续操作。

---

### 2a. 提交新插件

克隆插件仓库：

```
git clone [https://github.com/dmzz-yyhyy/LightNovelReader-PluginRepository.git](https://github.com/dmzz-yyhyy/LightNovelReader-PluginRepository.git)
cd LightNovelReader-PluginRepository/
```

创建新分支：

```
git checkout -b add-plugin-<插件名称>
```

添加子模块（使用插件包名作为 ID，例如 `com.example.plugin`）：

```
git submodule add <你的插件仓库地址> plugins/<插件ID>
git submodule set-branch --branch <分支名> plugins/<插件ID>
```

提交并推送：

```
git add .gitmodules plugins/<插件ID>
git commit -m "Add plugin: <插件名称>"
git push origin add-plugin-<插件名称>
```

---

### 2b. 更新已有插件

当插件仓库内容更新后，需要同步更新子模块。

如涉及版本更新，请重新使用分发包生成器生成新的分发包，并替换插件仓库中的相关文件。

克隆仓库：

```
git clone [https://github.com/dmzz-yyhyy/LightNovelReader-PluginRepository.git](https://github.com/dmzz-yyhyy/LightNovelReader-PluginRepository.git)
cd LightNovelReader-PluginRepository/
```

创建新分支：

```
git checkout -b update-plugin-<插件名称>
```

初始化子模块（仅当前插件）：

```
git submodule update --init plugins/<插件ID>
```

更新到最新版本：

```
cd plugins/<插件ID>
git fetch
git checkout main
git pull
cd ../..
```

提交并推送：

```
git add plugins/<插件ID>
git commit -m "Update plugin: <插件名称>"
git push origin update-plugin-<插件名称>
```

---

### 3. 发起 PR

完成上述步骤后，在本仓库中发起 Pull Request。

所有插件需要通过批准后才会被上架：[👉 参见 审核规则](https://plugins.nariko.org/review-guidelines)