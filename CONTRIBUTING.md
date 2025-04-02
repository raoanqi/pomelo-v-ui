# 参与贡献 Pomelo-V-UI

感谢您有兴趣为Pomelo-V-UI做出贡献！本文档提供了为这个Vue 3组件库做出贡献的指南和说明。

## 目录

- [行为准则](#行为准则)
- [入门指南](#入门指南)
- [开发工作流程](#开发工作流程)
- [组件开发指南](#组件开发指南)
- [提交拉取请求](#提交拉取请求)
- [编码标准](#编码标准)
- [测试](#测试)
- [文档](#文档)

## 行为准则

请帮助我们保持项目的开放性和包容性。通过参与，您应当遵守以下准则：

- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 专注于对社区最有利的事情
- 对其他社区成员表现出同理心

## 入门指南

### 先决条件

- Node.js (16版本或更高)
- pnpm (7.0.0或更高版本)

### 设置

1. 在GitHub上fork本仓库
2. 在本地克隆你的fork:

   ```bash
   git clone https://github.com/你的用户名/pomelo-v-ui.git
   cd pomelo-v-ui
   ```

3. 添加原始仓库作为upstream:

   ```bash
   git remote add upstream https://github.com/原始拥有者/pomelo-v-ui.git
   ```

4. 安装依赖:

   ```bash
   pnpm install
   ```

5. 启动开发服务器:

   ```bash
   pnpm dev
   ```

## 开发工作流程

1. 为你的功能或bug修复创建一个新分支:

   ```bash
   git checkout -b feature/你的功能名称
   ```

   或

   ```bash
   git checkout -b fix/你要修复的问题
   ```

2. 遵循[组件开发指南](#组件开发指南)进行修改。

3. 使用清晰的提交消息提交您的更改:

   ```bash
   git commit -m "feat: 添加新组件" or "fix: 解决按钮点击问题"
   ```

   我们遵循[约定式提交](https://www.conventionalcommits.org/)规范。

4. 推送到您的fork:

   ```bash
   git push origin feature/你的功能名称
   ```

5. [提交拉取请求](#提交拉取请求).

## 组件开发指南

### 组件结构

每个组件应当遵循以下结构:

```txt
src/components/组件名称/
├── 组件名称.vue        # 主组件文件
├── types.ts           # 组件的TypeScript接口和类型
├── style.css          # 组件样式
└── __tests__/         # 测试目录
    └── 组件名称.test.ts  # 组件测试
```

### 组件设计原则

1. **组合式API**: 使用Vue 3的组合式API和`<script setup>`语法。
2. **TypeScript**: 所有组件必须使用TypeScript编写，并提供适当的类型定义。
3. **Props接口**: 在单独的types.ts文件中为组件props定义清晰的接口。
4. **事件**: 对组件发出的所有事件使用defineEmits。
5. **CSS类名**: 遵循BEM命名约定:
   - 基础类: `p-组件名称`
   - 元素: `p-组件名称__元素`
   - 修饰符: `p-组件名称--修饰符` 或 `is-状态`

### 示例组件

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { YourComponentProps } from './types'

defineOptions({
  name: 'PYourComponent'
})

const props = defineProps<YourComponentProps>()
const emit = defineEmits<{
  (e: 'change', value: any): void
}>()

// 组件逻辑
</script>

<template>
  <div class="p-your-component">
    <!-- 组件模板 -->
  </div>
</template>
```

## 提交拉取请求

1. 确保您的分支与主仓库保持同步:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. 将更改推送到您的fork:

   ```bash
   git push origin feature/你的功能名称
   ```

3. 前往GitHub仓库并开启拉取请求。

4. 在PR描述中:

   - 描述PR做了什么
   - 链接到相关问题
   - 如果包含UI更改，请附上截图或动画
   - 如果存在PR模板，请填写完整

5. 等待维护者审核您的PR并处理反馈。

## 编码标准

我们使用ESLint和Prettier来强制编码标准。在提交PR前，请确保您的代码通过lint检查:

```bash
pnpm lint
```

以及格式化:

```bash
pnpm format
```

主要准则:

- 使用2个空格进行缩进
- 字符串使用单引号
- 语句末尾添加分号
- 遵循Vue风格指南(优先级A和B规则)
- 组件名称使用PascalCase(如PButton)

## 测试

所有组件都应该有测试覆盖其功能:

1. **单元测试**: 测试单个组件函数和渲染。
2. **集成测试**: 必要时测试组件交互。

使用以下命令运行测试:

```bash
pnpm test
```

### 测试指南

- 测试所有props及其对渲染的影响
- 测试组件发出的所有事件
- 测试组件交互(点击、键盘导航等)
- 测试预期的可访问性行为

## 文档

对于每个组件，请记录:

1. **用法**: 如何使用组件的基本示例
2. **Props**: 所有可用的props及其类型、默认值和描述
3. **事件**: 组件发出的所有事件
4. **插槽**: 可用的插槽
5. **示例**: 各种使用示例

文档应以markdown格式存在于组件目录中的README.md文件中，或在单独的docs/目录中。

---

感谢您为Pomelo-V-UI做出贡献！您的努力将帮助使这个组件库对所有人更好。
