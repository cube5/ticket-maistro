<template>
  <footer id="footer">
    <div>
      Powered by
      <img
        class="ticketmaster-logo"
        src="https://s1.ticketm.net/tm/en-us/img/sys/alpha/discovery/header/ticketmaster_logo.svg"
        alt="powered by ticketmaster"
      />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
#footer {
  background-color: $white;
  display: grid;
  justify-content: end;
  padding: 15px 20px;

  .ticketmaster-logo {
    width: 150px;
    height: 100%;
    padding: 0px 20px;
  }
}
</style>

