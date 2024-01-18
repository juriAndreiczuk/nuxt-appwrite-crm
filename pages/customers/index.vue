<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query'
  import { COLLECTION_CUSTOMERS, DB_ID } from '@/utils/app.constants'
  import type { ICustomer } from '@/types/deals.types'
  import { Table, TableBody,TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

  useHead({
    title: 'Customers'
  })

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS) as unknown as ICustomer[]
  })
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Our clients</h1>
    <div v-if="isLoading">Loading...</div>
    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[80px] px-2">ico</TableHead>
          <TableHead class="w-[80px] px-2">name</TableHead>
          <TableHead class="w-[80px] px-2">email</TableHead>
          <TableHead class="w-[80px] px-2">source</TableHead>
          <TableHead class="w-[80px] px-2">edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="customer in (customers?.documents as unknown as ICustomer[])"
          :key="customer.$id"
        >
          <TableCell> <img :src="customer.avatar_url"> </TableCell>
          <TableCell> {{ customer.Name }}</TableCell>
          <TableCell> {{ customer.email }} </TableCell>
          <TableCell> {{ customer.from_source || '----' }} </TableCell>
          <TableCell> <NuxtLink :to="`/customers/edit/${customer.$id}`">Edit</NuxtLink> </TableCell>
        </TableRow>
      </TableBody>
   </Table>
  </div>
</template>