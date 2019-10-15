<template>
  <div style="text-align: center;">
    <el-time-picker
      v-model="time"
      placeholder="请选择下班时间"
      value-format="HH:mm"
    >
    </el-time-picker>
    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        size="small"
        @click="handleClick"
        @change="handleChange"
      >
        设定
      </el-button>
    </div>
    <span v-if="showTips">请选择时间</span>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron';
  
  export default {
    name: 'set-time-page',
    data() {
      return {
        time: null,
        showTips: false,
        timer: null,
      };
    },
    methods: {
      handleClick() {
        if (!this.time) {
          this.showTips = true;
          return;
        }
        if (this.timer) {
          return;
        }
        const [hour, minute] = this.time.split(':');
        const setTime = new Date();
        setTime.setHours(hour);
        setTime.setMinutes(minute);
        setTime.setSeconds(0);
        // 判断当前时间是否为整点, 以及是否以及到达time, 精确到秒
        const checkTime = (time) => {
          const now = new Date();
          if (parseInt(now.getTime() / 1000, 10) === parseInt(time.getTime() / 1000, 10)) {
            return {
              reach: true,
            };
          }
          return now.getMinutes() === 0 && now.getSeconds() === 0 ? {
            reach: false,
          } : null;
        };
        this.timer = setInterval(() => {
          const check = checkTime(setTime);
          if (check) {
            ipcRenderer.send('open-alert-dialog', check.reach, setTime);
            // 到达设定的时间则清除定时器
            if (check.reach) {
              clearInterval(this.timer);
              this.timer = null;
            }
          }
        }, 1000);
      },
      handleChange() {
        if (!this.showTips) {
          this.showTips = true;
        }
      },
    },
  };
</script>