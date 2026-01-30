# 仓库准则

## 项目结构与模块组织
- **`src/`** – 源代码（Python 模块、助手或其他语言文件）。如果仓库中没有 `src/`，则根目录视为源代码目录。
- **`tests/`** – 单元测试与集成测试。测试文件应与源代码结构保持一致，文件名使用后缀 `.test.py`。
- **`docs/`** – 可选文档与配置文件。
- **`assets/`** – 静态文件，例如图片或数据。

## 构建、测试与开发命令
| 命令 | 作用 |
|---------|---------|
| `python test.py` | 快速健康检查 – 打印一条消息。 |
| `python -m unittest discover` | 运行 `tests/` 下的所有测试并报告结果。 |
| `pip install -r requirements.txt` | 安装项目依赖（当项目增大时添加 `requirements.txt`）。 |

## 编码规范与命名约定
- 使用 **2 个空格** 缩进；禁止使用制表符。
- 文件名使用小写并以下划线分隔（`my_module.py`）。
- 函数和变量名使用 `snake_case`。
- 类名使用 `PascalCase`。
- 在提交前运行 `flake8 .`（或 `pylint`）以确保符合风格规范。

## 测试指南
- **框架**：`unittest`（Python 自带）。未来可使用 `pytest` – 需相应调整命令。
- **覆盖率**：新功能目标至少 **70 %** 行覆盖率。
- **命名**：测试文件位于 `tests/`，文件名以 `.test.py` 结尾。例如，`tests/foo.test.py` 对应 `src/foo.py`。
- **运行**：`python -m unittest discover` 或单文件使用 `python test.py`。

## 提交与拉取请求准则
- 提交信息遵循 **Conventional Commits** 格式（`feat:`, `fix:`, `docs:`, `chore:`）。可查看近期历史以获取示例。
- 拉取请求需满足：
  - 标题清晰，描述变更内容。
  - 正文解释 *为何* 做此更改以及其实现方式。
  - 引用相关 issue（如 `Issue #42`）。
  - 本地及 CI 环境下所有测试均通过。
  - 对 UI 相关更改包含描述性差异或截图。

---

如遇到问题或需要帮助，请创建 issue 或联系核心维护者。
