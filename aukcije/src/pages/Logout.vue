<script>
import axios from 'axios';

export default {
  created() {
    // Call logout method when the component is created
    this.logout();
  },
  methods: {
    async logout() {
      try {
        await axios.get('http://localhost:3000/logout'); 
        this.$router.push('/Prijava');
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Odjavljeni ste!',
          icon: 'check_circle'
        });
      } catch (error) {
        console.error('Error logging out:', error);
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Greška pri odjavi!',
          icon: 'warning' 
        });
      }
    }
  }
};
</script>