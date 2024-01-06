<script setup lang="ts">
  import { useMutation } from '@tanstack/vue-query'
  import { v4 as uuid } from 'uuid'
  import { defineProps } from 'vue'
  import { COLLECTION_DEALS, DB_ID } from '@/utils/app.constants'
  import type { IDeal } from '@/types/deals.types'

  const isOpenForm = ref(false)

  interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
    customers: {
      email: string
      Name: string
    }
    Status: string
  }

  const props = defineProps({
    status: {
      type: String,
      default: ''
    }, 
    refetch: {
      type: Function
    }
  })

  const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
    initialValues: {
      Status: props.status
    }
  })

  const [name, nameAttrs] = defineField('name')
  const [price, priceAttrs] = defineField('price')
  const [customerEmail, customerEmailAttrs] = defineField('customers.email')
  const [customerName, customerNameAttrs] = defineField('customers.Name')

  const { mutate, isPending } = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: IDealFormState) => 
      DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
    onSuccess() {
      props.refetch && props.refetch()
      handleReset()
    }
  })

  const onSubmit = handleSubmit(values => {
    mutate(values)
  })


</script>

<template>
  <div class="text-crenter mb-2">
    <button
      @click="isOpenForm = !isOpenForm"
    >
      <Icon 
        v-if="isOpenForm"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="25"
      />
      <Icon 
        v-else
        name="radix-icons:plus"
        class="fade-in-100 fade-out-0"
        size="25"
      />
    </button>
  </div>
  <form 
    v-if="isOpenForm"
    @submit="onSubmit"
  >
    <Input
      placeholder="name"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
    />
    <Input
      placeholder="Price"
      v-model="price"
      v-bind="priceAttrs"
      type="text"
    />
    <Input
      placeholder="Email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
    />
    <Input
      placeholder="Company"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
    />
    <button :disabled="isPending">
      {{ isPending ? 'Loading...' : 'Add'  }}
    </button>
  </form>
</template>