<template>
  <header>
    <nav>
      <ul>
        <li>
          <button>首页</button>
        </li>
        <li>
          <button>能源概览</button>
        </li>
        <li>
          <button>基础设施</button>
        </li>
        <li>
          <button>碳中和</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheNavBar"
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

button {
  font: inherit;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

button:hover,
button:active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>