<template>
  <b-list-group-item v-b-modal="item.key" class="d-flex justify-content-between align-items-center">
    {{ item.nome }}
    <div>
    <div v-if="item.emails != undefined " >
    <b-badge class="mx-3" variant="primary" pill> {{ item.emails.length }}</b-badge>
    <b-icon icon="pencil-fill" scale="1"></b-icon>
    </div>
    <div v-if="type != 'topicos'" >
    <SuperSetEditForm :dados="item" :type="type" />
    </div>
    <div v-else-if="model != 'sets'">
    <TopicosEditForm :dados="item" :type="type" :model="model"/>
    </div>
    <div v-else
    >
    <SuperSetTopicsEditForm :dados="item" :type="type" :model="model"/>
    </div>
    </div>
  </b-list-group-item>
</template>

<script>
import SuperSetEditForm from '@/components/SuperSetEditForm'
import SuperSetTopicsEditForm from '@/components/SuperSetTopicsEditForm'
import TopicosEditForm from '@/components/TopicosEditForm'
export default {
    name: "SuperSetListItem",
    components:{
        SuperSetEditForm,
        TopicosEditForm,
        SuperSetTopicsEditForm
    },
    props: ['item','type','model'],
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