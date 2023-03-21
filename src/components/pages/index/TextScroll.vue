<template>
  <div class="absolute center" style="bottom: 0px; color: white">
    <p style="margin: 0">Scroll Down</p>
    <div style="height:50px; 
    height: 5vh;
    width: 1px;
    background-color: white;
    margin: 5px auto 0;"></div>
  </div>
</template>
<script setup>
</script>
<style scoped>
*{
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}
body {
  margin: 0;
}
a{
  text-decoration: inherit;
  color: inherit;
}
canvas {
  display: block;
}
.absolute{
  position: absolute
}
.center{
  transform: translate(-50%, 0);
  left: 50%;
}
.menu{
  text-align: center;
}
.menu h1, p, h2{
  color: white;
}
.menu h1{
  margin: 0 auto 5px;
}
.menu p{
  margin: 2vh auto 0;
}
.btn::before{
  content:'';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--border-height);
  background-color: white;
  transition: transform 300ms ease-in-out;
  transform: scaleX(0);
}
.btn:hover::before,
.btn:focus::before{
  transform: scaleX(1);
}
</style>