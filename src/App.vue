<template>
    <div>消息：</div>
    <div class="message-wrapper" v-html="wrapperApi.renderMessage(message)"></div>
    <div>当前楼层号: {{ floor }}</div>
    <div>是否最后一层: {{ isBottom }}</div>
    <div v-if="hasTavernHelper">酒馆助手已安装</div>
    <div v-else>酒馆助手未安装</div>
</template>

<script lang="ts" setup>
import { ProjectHelper } from '@sillytavern-vue-frontend/project-helper';

// 消息，在酒馆中流式传输时会自动更新
const message = ProjectHelper.useMessage();

// 楼层号，在酒馆中流式传输时会自动更新
const { floor, isBottom } = ProjectHelper.useFloor();

// Wrapper API，Vue前端插件的大多数功能集成于该API中
const wrapperApi = ProjectHelper.wrapperApi();

// 可使用window.TavernHelper访问酒馆助手的功能
const hasTavernHelper = !!window.TavernHelper;
</script>

<style lang="scss" scoped>
.message-wrapper {
    border: 1px solid;
    border-radius: 4px;
    padding: 4px;
    margin: 4px;
}
</style>
