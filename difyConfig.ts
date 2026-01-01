export const DIFY_API_URL = 'http://api.dify.ai/v1'; // 替换为后端提供的实际地址, 如果是本地部署可能是 http://localhost/v1
export const DIFY_API_KEY = ''; // 建议这里留空，通过环境变量注入，或者后端如果已经配置好转发，这里可能不需要Key，具体看后端文档。
// 但通常前端调Dify App API需要一个 "App Key"

// 知识库内容由 Dify 后台管理，前端不需要维护 YANFENG_KNOWLEDGE_BASE
