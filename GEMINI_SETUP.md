# Gemini AI API 设置指南

## 步骤 1: 获取 Gemini API 密钥

1. 访问 Google AI Studio: https://makersuite.google.com/app/apikey
2. 使用您的 Google 账号登录
3. 点击 "Create API Key" 或 "Get API Key"
4. 复制生成的 API 密钥

## 步骤 2: 配置环境变量

1. 在项目根目录创建 `.env` 文件
2. 添加以下内容：

```
VITE_GEMINI_API_KEY=your_api_key_here
```

3. 将 `your_api_key_here` 替换为您从 Google AI Studio 获取的实际 API 密钥

## 步骤 3: 重启开发服务器

配置完成后，需要重启开发服务器：

```bash
npm run dev
```

## 注意事项

- `.env` 文件已添加到 `.gitignore`，不会提交到版本控制
- API 密钥是敏感信息，请勿分享或提交到公共仓库
- 如果没有配置 API 密钥，系统会使用模式匹配作为后备方案，功能仍然可用但 AI 响应会受限

## 测试

配置完成后，在 "Speak to Ryse" 界面输入任何消息，应该会收到 Gemini AI 的智能回复。


