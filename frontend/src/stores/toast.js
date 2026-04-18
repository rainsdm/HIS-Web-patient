// 文件路径: src/stores/toast.js

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);
    let idCounter = 0;

    /**
     * 显示一条通知
     * @param {string} message - 要显示的消息文本
     * @param {'success' | 'error'} type - 通知类型 ('success' 或 'error')
     * @param {number} duration - 显示时长（毫秒）
     */
    function show(message, type = 'success', duration = 3000) {
        const id = idCounter++;
        
        // 向队列中添加一个新的通知对象
        toasts.value.unshift({ id, message, type });

        // 设置一个计时器，在指定时间后自动移除该通知
        setTimeout(() => {
            remove(id);
        }, duration);
    }

    /**
     * 根据 ID 移除一条通知
     * @param {number} id - 要移除的通知的 ID
     */
    function remove(id) {
        const index = toasts.value.findIndex(toast => toast.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
        }
    }

    return { toasts, show, remove };
});