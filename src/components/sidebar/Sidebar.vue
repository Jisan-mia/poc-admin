<script>
import SidebarLink from './SidebarLink'
import { ref } from 'vue'
import { isActive, toggleActive } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    const position = 'admin';
  
    return { position,toggleActive, isActive }
  }
}
</script>

<template>
  <div  class="hamburger" @click="toggleActive">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>

  <div :class="['sidebar', isActive ? 'active' : '']">
    
    <h1>
      <span class="crossBar__parent" v-if="isActive">
        <img alt="Vue logo" class= "poc_logo2" src="@/assets/poc_logo_small.png" />

        <div class="crossBar" @click="toggleActive">
          <div class="bar1"></div>
          <div class="bar2"></div>
        </div>
      </span>
      <span class="bigSpan"><img alt="Vue logo" class= "poc_logo" src="@/assets/poc_logo.svg" /></span>
    </h1>

    <span v-if="position == 'user'">
      <SidebarLink to="/dashboard" icon="fas fa-home">Dashboard</SidebarLink>
      <SidebarLink to="/exam-pack" icon="fas fa-columns">Exam Pack</SidebarLink>
      <SidebarLink to="/reporting" icon="fas fa-chart-bar">Reporting</SidebarLink>
      <SidebarLink to="/edit-profile" icon="fas fa-cog">Edit Profile</SidebarLink>
    </span>

    <span v-else-if="position == 'admin'">
      <SidebarLink to="/admin/dashboard" icon="fas fa-home">Dashboard</SidebarLink>
      <SidebarLink to="/admin/exam-pack" icon="fas fa-columns">Exam Pack</SidebarLink>
      <SidebarLink to='/admin/exam-management' icon="fas fa-user-circle">Exam Management</SidebarLink>
      <SidebarLink to='/admin/student-management' icon="fas fa-user-circle">Student Management</SidebarLink>
      <SidebarLink to="/admin/reporting" icon="fas fa-chart-bar">Reporting</SidebarLink>
      <!-- <SidebarLink to="/edit-profile" icon="fas fa-cog">Edit Profile</SidebarLink> -->
      <SidebarLink  icon="fas fa-cog">
        <span>Settings</span>
        <div class="nested">
          <SidebarLink :isNested="true" to="/admin/user-management" icon="fas fa-circle">
            <span class="text">
              User Management 
            </span>
          </SidebarLink>  
          <SidebarLink :isNested="true" to="/admin/account-management" icon="fas fa-circle"> 
            <span class="text">
              Account Management 
            </span>
          </SidebarLink>  
        </div>
      </SidebarLink>
    </span>

    <span v-else>

    </span>

    
<!-- 
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span> -->
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #E5E5E5;
  --sidebar-item-hover: #00A9DC;
  --sidebar-item-active: #00A9DC;
}
</style>

<style lang="scss" scoped>
@import '@/styles/config.scss';
.poc_logo2
{
  width: 2rem;
  transition: 5s linear;
}
.poc_logo
{
  width: 9rem;
  transition: 0.2s linear;
}
.sidebar {
  width: 200px;
  color: black;
  background-color: var(--sidebar-bg-color); 
  float: left;
  position: fixed;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding-left: 1.5em;
  padding-right: 1.6em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  @include maxMedia(768px) {
    left: -300px;
  }
}

.sidebar.active {
  left: 0px;
}


.hamburger {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  position: relative;
  left: 28px;
  top: 40px;
  width: 25px;
  height: 25px;

  @include maxMedia(768px) {
    display: flex;
  }
  .bar {
    height: 2px;
    width: 100%;
    background: black;
  }
  
}

.crossBar__parent {
  display: none;
  align-items: center;
  justify-content: space-between;

  @include maxMedia(768px) {
    display: flex;
  }
}

.bigSpan {
  display: block;
  @include maxMedia(768px) {
    display: none;
  }
}
.crossBar {
  width: 25px; 
  height: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  cursor: pointer;

  .bar1, .bar2 {
    height: 2px;
    width: 100%;
    background: black;
  }
  .bar1 {
    transform: rotate(45deg) translate(9px);
  }
  .bar2 {
    transform: rotate(-45deg) translate(9px);
    
  }
}
.nested{
  position: absolute;
  left: 25px;
  top: 30px;
  font-size: 0.78rem;
  span.text {
    font-size: 0.75rem;
  }
}
.sidebar h1 {
  height: 4em;
  padding-top: 2.5rem;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  
  color: var(--sidebar-item-active);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>