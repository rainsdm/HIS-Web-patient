// src/utils/api.js

import { useUserStore } from '@/stores/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * 封装一个全局的请求函数，内置 token 处理和 401 自动登出
 * @param {string} url - 请求的相对路径
 * @param {object} options - fetch 的配置对象
 * @returns {Promise<any>}
 */
export async function request(url, options = {}) {
    const userStore = useUserStore();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // 如果用户已登录，自动在请求头中添加 Authorization
    if (userStore.isLoggedIn && userStore.token) {
        headers['Authorization'] = `Bearer ${userStore.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        console.warn('捕获到 401 未授权错误，执行自动登出');
        // 静默退出
        userStore.logout(true); 
        throw new Error('身份认证已过期，请重新登录');
    }

    if (!response.ok) {
        throw new Error(`网络请求失败: ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 200) {
        throw new Error(result.message || 'API 请求业务失败');
    }

    return result.data;
}

/**
 * 检查 JWT 是否已过期
 * @param {string | null} token
 * @returns {boolean} - true 表示已过期或无效, false 表示有效
 */
export function isTokenExpired(token) {
    if (!token) return true;

    try {
        // Token 由三部分组成，我们只需要第二部分 (Payload)
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return true;
        
        const decodedJson = atob(payloadBase64);
        const decoded = JSON.parse(decodedJson);

        const exp = decoded.exp;
        
        const now = Math.floor(Date.now() / 1000);

        return now >= exp;
    } catch (error) {
        console.error("Token 解码失败:", error);
        return true;
    }
}