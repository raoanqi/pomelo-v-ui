# 从npm迁移到pnpm

本项目已从npm迁移到pnpm作为包管理器。本文档提供了关于这次迁移的信息和如何在项目中使用pnpm的指南。

## 为什么选择pnpm？

pnpm提供了几个相对于npm的优势：

1. **磁盘空间效率**：pnpm使用硬链接和符号链接来节省磁盘空间，不会重复安装相同的包。
2. **更快的安装速度**：由于其独特的存储结构，pnpm通常比npm和yarn更快。
3. **严格的包管理**：默认情况下，pnpm创建一个非扁平的node_modules结构，防止访问未声明的依赖项。
4. **工作空间支持**：原生支持monorepo项目结构。

## 安装pnpm

如果你还没有安装pnpm，可以使用以下命令安装：

```bash
# 使用npm安装
npm install -g pnpm

# 或者使用官方安装脚本
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

检查安装是否成功：

```bash
pnpm --version
```

## 项目设置

克隆项目后，使用pnpm安装依赖：

```bash
pnpm install
```

## 常用命令对照表

| npm 命令                       | pnpm 等效命令       | 说明               |
| ------------------------------ | ------------------- | ------------------ |
| `npm install`                  | `pnpm install`      | 安装所有依赖       |
| `npm install <pkg>`            | `pnpm add <pkg>`    | 安装某个包         |
| `npm install <pkg> --save-dev` | `pnpm add <pkg> -D` | 安装为开发依赖     |
| `npm uninstall <pkg>`          | `pnpm remove <pkg>` | 卸载某个包         |
| `npm run <script>`             | `pnpm <script>`     | 运行脚本（可简化） |
| `npm run build`                | `pnpm build`        | 构建项目           |
| `npm run dev`                  | `pnpm dev`          | 开发模式           |

## 项目特定的脚本

所有的npm脚本都已更新为与pnpm一起工作：

```bash
# 开发模式
pnpm dev

# 构建项目
pnpm build

# 类型检查
pnpm type-check

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 格式化代码
pnpm format
```

## 注意事项

1. **Lock文件**：我们现在使用`pnpm-lock.yaml`而不是`package-lock.json`。请确保不要删除这个文件，并在合并冲突时小心处理。

2. **Node.js版本**：请确保你使用的Node.js版本与项目要求匹配（16.0.0或更高）。

3. **配置文件**：项目包含几个pnpm特定的配置文件：

   - `.npmrc`：pnpm配置
   - `pnpm-workspace.yaml`：工作空间配置

4. **已知问题**：如果遇到任何与pnpm相关的问题，请查看[官方文档](https://pnpm.io/troubleshooting)或在项目的Issues中提问。

## 从npm迁移时需要执行的步骤

如果你正在将现有项目从npm迁移到pnpm：

1. 删除`node_modules`目录和`package-lock.json`文件：

   ```bash
   rm -rf node_modules package-lock.json
   ```

2. 使用pnpm安装依赖：

   ```bash
   pnpm install
   ```

3. 提交生成的`pnpm-lock.yaml`文件：

   ```bash
   git add pnpm-lock.yaml
   git commit -m "chore: migrate to pnpm"
   ```
