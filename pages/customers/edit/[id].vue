<script lang="ts" setup>
  import { storage } from '@/utils/appwrite'
  import { useMutation, useQuery } from '@tanstack/vue-query'
  import { v4 as uuidv4 } from 'uuid'
  import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '@/utils/app.constants'
  import type { ICustomer } from '@/types/deals.types'

  interface ICustomerFormState extends Pick<ICustomer, 'avatar_url' | 'email' | 'Name' | 'from_source'> {}

  interface InputFileEvent extends Event {
    target: HTMLInputElement
  }

  useHead({
    title: 'Edit customer'
  })

  const route =  useRoute()
  const customerId = route.params.id as string

  const { handleSubmit, defineField, setFieldValue, setValues, values  } = useForm<ICustomerFormState>()

  const { data, isSuccess } = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
  })

  watch(isSuccess, () => {
    const initialData = data.value as unknown as ICustomerFormState
    const { email, Name, avatar_url, from_source } = initialData
    setValues({
     email, Name, avatar_url, from_source: from_source || ''
    })
  })

  const [Name, NameAttrs] = defineField('Name')
  const [email, emailAttrs] = defineField('email')
  const [fromSource, fromSourceAttrs] = defineField('from_source')

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateCustomer', customerId],
    mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
  })

  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    mutationKey: ['upload image'],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuidv4(), file),
    onSuccess(data) {
      const response = storage.getFileDownload(STORAGE_ID, data.$id)
      setFieldValue('avatar_url', response.href)
    }
  })

  const onSubmit = handleSubmit(values => {
    mutate(values)
  })
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Edit customer</h1>
    <form @submit="onSubmit" class="w-[300px]">
      <Input 
        type="text"
        v-model="Name"
        placeholder="name"
      />
      <Input
        type="text"
        v-model="email"
        placeholder="email"
      />
      <Input
        type="text"
        v-model="fromSource"
        placeholder="source"
      />

      <img
        v-if="values.avatar_url || isUploading"
        :src="values.avatar_url"
        class="rounded-full my-2"
      >
      <Input 
        type="file" 
        @change="(e:InputFileEvent) => e?.target.files?.length && uploadImage(e.target.files[0])"
      />
      <Button 
        :disabled="isPending"
        class="mt-3"
      >Edit</Button>
    </form>
  </div>
</template>