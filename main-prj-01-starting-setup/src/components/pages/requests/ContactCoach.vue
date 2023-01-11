<template>
  <form @submit.prevent="submitMessage">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
      <p v-if="!email.isValid">E-Mail can not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.val"
        @blur="clearValidity('message')"
      ></textarea>
      <p v-if="!message.isValid">Message can not be empty.</p>
    </div>
    <div>
      <p v-if="!messageIsValid">Please provide the missing information(s).</p>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      messageIsValid: true,
    };
  },
  methods: {
    validateMessage() {
      this.messageIsValid = true;

      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.messageIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        this.messageIsValid = false;
      }
    },
    submitMessage() {
      this.validateMessage();

      if (!this.messageIsValid) {
        return;
      }

      this.$store.dispatch('requests/contactCoach', {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      });
      this.$router.replace('/coaches');
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
