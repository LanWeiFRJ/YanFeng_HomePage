# 檐枫 (YanFeng) 网站后端接口文档 - 公众号爬虫模块

## 1. 概述 (Overview)
本模块主要负责提供微信公众号爬虫抓取的数据，供前端“最新资讯”栏目展示。
前端对应组件：`WeChatNewsColumn`
数据类型定义：`NewsItem` (见 `types.ts`)

---

## 2. 数据结构 (Data Models)

### NewsItem (DTO)
前端展示所需的标准文章对象结构。

| 字段名 (Key) | 类型 (Type) | 必填 (Required) | 说明 (Description) | 示例 (Example) |
| :--- | :--- | :--- | :--- | :--- |
| `id` | string | 是 | 唯一标识符 | `"wx_20231231_01"` |
| `title` | string | 是 | 文章标题 | `"【冬日祭】2024年冬季活动回顾"` |
| `date` | string | 是 | 发布日期，格式 YYYY-MM-DD | `"2024-12-31"` |
| `summary` | string | 是 | 文章摘要或首段文字 | `"本次活动圆满结束，感谢大家的参与..."` |
| `link` | string | 是 | 原始文章跳转链接 | `"https://mp.weixin.qq.com/s/..."` |
| `coverUrl` | string | 否 | 封面图片链接 | `"https://mmbiz.qpic.cn/..."` |

---

## 3. 接口定义 (API Endpoints)

> 基础路径 (Base URL): `/api/v1` (建议)

### 3.1 获取文章列表
获取最新抓取的公众号文章列表。

- **接口地址**: `/wechat/articles`
- **请求方式**: `GET`
- **请求参数**:
  | 参数名 | 类型 | 必填 | 说明 |
  | :--- | :--- | :--- | :--- |
  | `page` | number | 否 | 页码，默认 1 |
  | `pageSize` | number | 否 | 每页数量，默认 10 |

- **成功响应 (200 OK)**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "wx_001",
        "title": "2024冬日祭活动宣发",
        "date": "2024-12-25",
        "summary": "期待与你在冬天相遇！",
        "link": "https://mp.weixin.qq.com/s/example",
        "coverUrl": "https://example.com/cover.jpg"
      },
      {
        "id": "wx_002",
        "title": "招新面试结果公示",
        "date": "2024-09-10",
        "summary": "欢迎加入檐枫大家庭。",
        "link": "https://mp.weixin.qq.com/s/example2",
        "coverUrl": null
      }
    ],
    "total": 100
  }
}
```


---

## 3. 注意事项 (Notes)
1. **图片防盗链处理**:
   - 微信公众号图片 (`mmbiz.qpic.cn`) 通常有防盗链 (Referer check)。
   - **方案 A (后端代理)**: 后端下载图片并存储到自己的 OSS/服务器，`coverUrl` 返回自己的链接。
   - **方案 B (前端处理)**: 前端在 `<head>` 添加 `<meta name="referrer" content="never">` (不推荐，影响全局)。
   - **方案 C (Images.weserv.nl)**: 开发阶段可使用第三方缓存服务，如 `https://images.weserv.nl/?url=原图链接`。
   
   **建议后端采用方案 A**，以保证图片稳定性和加载速度。
