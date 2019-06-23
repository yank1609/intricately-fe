<template>
  <div class="nav-container">
    <div class="logo" />

    <div class="search-group">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search Companies">
      </div>

      <div class="separator">
        <span>OR</span>
      </div>

      <div class="button-part">
        <a href="javascript:void(0);" class="c-btn">
          NEW SMARTLIST
        </a>
      </div>
    </div>

    <ul class="nav-menu">
      <li>
        <a href="javascript:void(0);">
          PROSPECT <i class="fas fa-chevron-down"></i>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          ALERT <i class="fas fa-chevron-down"></i>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          LEARN <i class="fas fa-chevron-down"></i>
        </a>
      </li>
    </ul>

    <div class="profile-set">
      <div class="chrome-logo profile-image" />

      <div class="avatar-holder">
        <a href="javascript:void(0);">
          <img :src="require('Images/avatar.png')" class="profile-image">
          <i class="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>
