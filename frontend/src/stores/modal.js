// 文件路径: src/stores/modal.js

import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
    const isVisible = ref(false);
    const title = ref("确认操作");
    const message = ref("您确定要执行此操作吗？");
    // 定义一个 resolver，用于在用户操作后解决 Promise
    const resolver = ref(null);

    /**
     * 显示确认模态框并返回一个 Promise
     * @param {object} options
     * @param {string} options.title - 模态框标题
     * @param {string} options.message - 模态框消息
     * @returns {Promise<boolean>} - 用户点击“确认”则 resolve(true)，点击“取消”则 resolve(false)
     */
    function show(options) {
        title.value = options.title || "确认操作";
        message.value = options.message || "您确定要执行此操作吗？";
        isVisible.value = true;
        
        // 返回一个 Promise，并保存它的 resolve 方法
        return new Promise((resolve) => {
            resolver.value = resolve;
        });
    }

    function confirm() {
        isVisible.value = false;
        if (resolver.value) {
            resolver.value(true); // 解决 Promise 为 true
        }
    }

    function cancel() {
        isVisible.value = false;
        if (resolver.value) {
            resolver.value(false); // 解决 Promise 为 false
        }
    }

    return { isVisible, title, message, show, confirm, cancel };
});