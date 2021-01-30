<template>
  <b-list-group-item v-b-modal="item.nome" class="d-flex justify-content-between align-items-center">
    {{ item.nome }}
    <div>
    <b-badge class="mx-3" variant="primary" pill> {{ item.emails.length }}</b-badge>
    <b-icon icon="pencil-fill" scale="1"></b-icon>
    <SuperSetEditForm :dados="item" />
    </div>
  </b-list-group-item>
</template>

<script>
import SuperSetEditForm from '@/components/SuperSetEditForm'
export default {
    name: "SuperSetListItem",
    components:{
        SuperSetEditForm
    },
    props: ['item'],
    data(){
        return {}
    },
    mounted() {
        // console.log(this.$props.item)
    }
}
</script>

<style>

</style>