<template>
  <div class="profile-wrapper">
    <div class="breadcrumb">当前位置：首页 > 个人中心</div>

    <Card title="个人档案">
      <div class="space-y-3">
        <div class="flex border-b border-dashed border-(--border) pb-2">
          <span class="w-24 text-(--text-sub)">姓名：</span>
          <span class="font-bold">王五</span>
        </div>
        <div class="flex border-b border-dashed border-(--border) pb-2">
          <span class="w-24 text-(--text-sub)">证件号码：</span>
          <span>110***********1234</span>
        </div>
        <div class="flex">
          <span class="w-24 text-(--text-sub)">医疗保障：</span>
          <span class="text-(--success)">✔ 职工医保已关联</span>
        </div>
      </div>
    </Card>

    <Card title="我的挂号记录">
      <Table :columns="recordCols">
        <tr v-for="record in records" :key="record.id">
          <td>{{ record.date }}</td>
          <td>{{ record.dept }}</td>
          <td>{{ record.no }}</td>
          <td>
            <span :class="record.status === '已就诊' ? 'text-(--success)' : 'text-(--primary)'">
              {{ record.status }}
            </span>
          </td>
        </tr>
      </Table>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/base/Card.vue'
import Table from '@/components/base/Table.vue'

const recordCols = [
  { label: '就诊日期' }, { label: '科室与医师' }, { label: '序号' }, { label: '状态' }
]

const records = [
  { id: 101, date: '2026-03-10', dept: '内科 - 张三', no: 'A015', status: '已就诊' },
  { id: 102, date: '2026-03-16', dept: '内科 - 张三', no: '待分配', status: '预约成功' }
]
</script>