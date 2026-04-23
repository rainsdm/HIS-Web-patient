<template>
  <div class="appointment-wrapper">
    <div class="breadcrumb mb-4 text-[14px] text-(--text-sub)">当前位置：首页 > 门诊服务 > 预约挂号</div>

    <div class="appointment-layout flex flex-col gap-5">
      <StepSidebar :steps="pageSteps" :currentStep="1" />

      <div class="content w-full">
        <!-- Section 1: 就诊档案信息 (已改造为动态数据) -->
        <Card title="就诊档案信息" noTitleBorder class="bg-(--bg-color)">
          <!-- State: Loading -->
          <div v-if="loading" class="text-[14px] text-(--text-sub)">
            正在核对您的就诊档案...
          </div>
          <!-- State: Error -->
          <div v-else-if="error" class="text-[14px] text-(--danger)">
            档案信息加载失败：{{ error }}
          </div>
          <!-- State: Success -->
          <div v-else-if="profile" class="text-[14px]">
            就诊人：<strong class="text-(--text-main)">{{ profile.name }}</strong> 
            <span class="ml-4 text-(--text-sub)">证件号：{{ profile.maskedIdentityCard }}</span>
          </div>
        </Card>

        <!-- Section 2: 号源列表 (保持不变) -->
        <Card title="号源列表">
          <Table :columns="tableCols">
            <tr v-for="item in mockData" :key="item.id">
              <td>{{ item.doctor }}</td>
              <td>{{ item.room }}</td>
              <td><span class="text-(--primary) font-bold">{{ item.count }}</span></td>
              <td>{{ item.time }}</td>
              <td class="text-center">
                <Button @click="handleReserve(item)">点击预约</Button>
              </td>
            </tr>
          </Table>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Card from '@/components/base/Card.vue';
import StepSidebar from '@/components/base/StepSidebar.vue';
import Table from '@/components/base/Table.vue';
import Button from '@/components/base/Button.vue';

// --- State and Store ---
const userStore = useUserStore();
const profile = ref(null);
const loading = ref(true);
const error = ref(null);

// --- Component Logic ---
onMounted(async () => {
  try {
    // 组件加载时，调用 store 中定义好的方法来获取数据
    profile.value = await userStore.fetchAppointmentProfile();
  } catch (e) {
    console.error("获取预约档案失败:", e);
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

// --- Static Data (保持不变) ---
const pageSteps = [
  { title: '患者建档' },
  { title: '门诊排班预约' },
  { title: '挂号费支付' },
  { title: '候诊与报到' }
];
const tableCols = [
  { label: '医师' }, { label: '诊室' }, { label: '余号' }, { label: '时段' }, { label: '操作' }
];
const mockData = [
  { id: 1, doctor: '张三', room: '内科第一诊室', count: 12, time: '上午' },
  { id: 2, doctor: '李四', room: '内科第二诊室', count: 5, time: '下午' }
];
const handleReserve = (item) => {
  console.log('预约项目：', item);
};
</script>

<style scoped>
@reference "@/style.css";
</style>