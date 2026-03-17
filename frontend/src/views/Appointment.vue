<template>
  <div class="appointment-wrapper">
    <div class="breadcrumb">当前位置：首页 > 门诊服务 > 预约挂号</div>

    <div class="appointment-layout flex gap-5">
      <StepSidebar :steps="pageSteps" :currentStep="1" />

      <div class="content flex-grow">
        <Card title="就诊档案信息" noTitleBorder class="bg-(--bg-color)">
          <div class="text-[14px]">
            就诊人：<strong class="text-(--text-main)">王五</strong> 
            <span class="ml-4 text-(--text-sub)">证件号：110***********1234</span>
          </div>
        </Card>

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
import Card from '@/components/base/Card.vue'
import StepSidebar from '@/components/base/StepSidebar.vue'
import Table from '@/components/base/Table.vue'
import Button from '@/components/base/Button.vue'

const pageSteps = [
  { title: '患者建档' },
  { title: '门诊排班预约' },
  { title: '挂号费支付' },
  { title: '候诊与报到' }
]

const tableCols = [
  { label: '医师' }, { label: '诊室' }, { label: '余号' }, { label: '时段' }, { label: '操作' }
]

const mockData = [
  { id: 1, doctor: '张三', room: '内科第一诊室', count: 12, time: '上午' },
  { id: 2, doctor: '李四', room: '内科第二诊室', count: 5, time: '下午' }
]

const handleReserve = (item) => {
  console.log('预约项目：', item)
}
</script>