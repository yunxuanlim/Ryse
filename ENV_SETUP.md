# 环境变量设置指南

## 快速设置步骤

### 步骤 1: 获取 Gemini API 密钥

1. 访问 Google AI Studio: **https://makersuite.google.com/app/apikey**
2. 使用您的 Google 账号登录
3. 点击 **"Create API Key"** 或 **"Get API Key"** 按钮
4. 选择或创建一个 Google Cloud 项目
5. 复制生成的 API 密钥（格式类似：`AIzaSy...`）

### 步骤 2: 创建 .env 文件

在项目根目录（与 `package.json` 同级）创建 `.env` 文件：

**Windows (PowerShell):**
```powershell
# 方法 1: 使用记事本
notepad .env

# 方法 2: 使用命令行
New-Item -Path .env -ItemType File
```

**Windows (CMD):**
```cmd
type nul > .env
```

**Mac/Linux:**
```bash
touch .env
```

### 步骤 3: 添加 API 密钥

打开 `.env` 文件，添加以下内容：

```env
VITE_GEMINI_API_KEY=你的API密钥粘贴在这里
```

**示例：**
```env
VITE_GEMINI_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

### 步骤 4: 保存并重启

1. 保存 `.env` 文件
2. 如果开发服务器正在运行，请停止它（按 `Ctrl+C`）
3. 重新启动开发服务器：
   ```bash
   npm run dev
   ```

## 验证设置

设置完成后，在 "Speak to Ryse" 界面输入任何消息，如果看到智能的 AI 回复（而不是模式匹配的回复），说明配置成功！

## 注意事项

⚠️ **重要提示：**
- `.env` 文件包含敏感信息，**不要**提交到 Git 仓库
- 如果使用 Git，确保 `.env` 在 `.gitignore` 文件中
- API 密钥是免费的，但有使用限制
- 如果遇到错误，检查 API 密钥是否正确复制（没有多余的空格）

## 故障排除

**问题：AI 仍然使用模式匹配回复**
- 检查 `.env` 文件是否在项目根目录
- 检查变量名是否正确：`VITE_GEMINI_API_KEY`
- 确保重启了开发服务器
- 检查浏览器控制台是否有错误信息

**问题：API 密钥无效**
- 确认从 Google AI Studio 正确复制了密钥
- 检查密钥是否完整（没有截断）
- 确认 API 密钥没有被禁用


