# pomelo-v-ui

这个模板可以帮助你使用Vue 3和Vite开始开发。

## 包管理器

本项目使用pnpm作为包管理器。关于从npm迁移到pnpm的详细信息，请查看[迁移指南](./docs/migration-to-pnpm.md)。

## 推荐的IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用Vetur)。

## TypeScript对`.vue`导入的类型支持

TypeScript默认无法处理`.vue`导入的类型信息，因此我们用`vue-tsc`替代`tsc`进行类型检查。在编辑器中，我们需要[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)使TypeScript语言服务能够识别`.vue`类型。

## 贡献

我们欢迎对Pomelo-V-UI的贡献！请查看我们的[贡献指南](./CONTRIBUTING.md)了解如何参与。

## 自定义配置

请参阅[Vite配置参考](https://vitejs.dev/config/)。

## 项目设置

```sh
pnpm install
```

### 开发环境编译和热重载

```sh
pnpm dev
```

### 生产环境类型检查、编译和压缩

```sh
pnpm build
```

### 运行单元测试

```sh
pnpm test
```

### 使用[ESLint](https://eslint.org/)进行代码检查

```sh
pnpm lint
```
