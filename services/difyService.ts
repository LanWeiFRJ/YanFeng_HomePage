import axios from 'axios';
import { DIFY_API_URL } from '../difyConfig';

// 用一个变量存储当前的会话 ID，这样多轮对话才有上下文
let currentConversationId: string | null = null;
// 简单的用户 ID，实际项目中应该从登录态获取
const userId = 'user-' + Math.random().toString(36).substring(7);

// 定义 Dify 的响应接口 (简化版)
interface DifyResponse {
  event: string;
  answer?: string;
  conversation_id?: string;
  message_id?: string;
  // ... 其他字段
}

export const sendMessageToDify = async (message: string): Promise<string> => {
  try {
    // 检查 Key 是否存在 (假设我们在环境变量或者配置文件里配了)
    // 注意：如果是 Dify Cloud，Key 可以在 Header 里 Authorization: Bearer {API_KEY}
    // 这里假设 key 是通过 import.meta.env 获取，或者你需要手动填入
    const API_KEY = import.meta.env.VITE_DIFY_API_KEY || '请在这里填入你的Dify_App_Key'; 

    if (API_KEY === '请在这里填入你的Dify_App_Key' || !API_KEY) {
        console.warn('Dify API Key is missing. Please configure VITE_DIFY_API_KEY in .env file.');
        return "配置错误：未找到 Dify API Key。请联系管理员配置。";
    }

    const response = await axios.post(
      `${DIFY_API_URL}/chat-messages`,
      {
        inputs: {}, // 可以在这里传入 Prompt 变量
        query: message,
        response_mode: 'blocking', // 或者 'streaming' (流式需要更复杂的前端处理)
        conversation_id: currentConversationId,
        user: userId,
        files: [] 
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    
    // 更新会话 ID，保证下一次请求能接上文
    if (data.conversation_id) {
      currentConversationId = data.conversation_id;
    }

    return data.answer || "抱歉，由于网络波动，我没有听到你说什么...";

  } catch (error) {
    console.error('Dify API Error:', error);
    return "连接社团大脑失败（Dify API Error），请稍后再试。";
  }
};
