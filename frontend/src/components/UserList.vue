<template>
  <div class="col-md-4 mb-4">
    <div class="card user-card">
      <div class="card-header">
        <h5>Profile</h5>
      </div>
      <div class="card-block">
        <div class="user-image">
          <img
            src="../assets/groupomania.png"
            class="img-radius img-fluid width-100"
            alt="User-Profile-Image"
          />
        </div>
        <h6 class="text-center">
          {{ user.firstName }} {{ user.lastName }}
          <!-- Hello -->
        </h6>
        <p class="text-muted text-center">| {{ formattedTime }} |</p>
        <hr />
        <p class="m-t-15 text-muted">
          (bio) Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "UserList",
  props: ["user"],
  data() {
    return {
      formattedTime: "",
      now: 0,
      created_At: moment(),
    };
  },
  methods: {
    getFormattedTime(date) {
      let now = moment(); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
      let years = duration.asYears();

      if (years > 0) {
        return end.format("D/MMM/Y");
      }
    },
  },

  watch: {
    now() {
      this.formattedTime = this.getFormattedTime(this.user.createdAt);
    },
  },

  created() {
    this.formattedTime = moment();
    this.formattedTime = this.getFormattedTime(this.user.createdAt);
  },
};
</script>

<style lang="scss">
.profile-body {
  div {
    padding-left: 3px;
    padding-right: 3px;
  }
  .profile-pic {
    width: 6rem;
    height: auto;
  }
  p {
    text-align: left;
    padding: 0 0 0 0;
  }
  label {
    margin-right: 5rem;
  }
  .img-xs {
    width: 3rem;
    height: auto;
  }
  .s-image {
    width: 3rem;
    height: 3rem;
  }
}
</style>