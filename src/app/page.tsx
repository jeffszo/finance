'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon, BarChart2Icon, DollarSign, HomeIcon, PieChartIcon, SettingsIcon, UsersIcon } from 'lucide-react'

import {  } from "react-icons/ci";

export default function Component() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'entrada', description: 'Salary', amount: 5000 },
    { id: 2, type: 'saída', description: 'Rent', amount: 1500 },
    { id: 3, type: 'saída', description: 'Groceries', amount: 300 },
    { id: 4, type: 'entrada', description: 'Freelance work', amount: 1000 },
  ])

  const [newTransaction, setNewTransaction] = useState({
    type: 'entrada',
    description: '',
    amount: '',
  })

  const [activeTab, setActiveTab] = useState('dashboard')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTransaction(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value) => {
    setNewTransaction(prev => ({ ...prev, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTransaction.description && newTransaction.amount) {
      setTransactions(prev => [
        ...prev,
        {
          id: prev.length + 1,
          ...newTransaction,
          amount: parseFloat(newTransaction.amount)
        }
      ])
      setNewTransaction({ type: 'income', description: '', amount: '' })
    }
  }

  const totalIncome = transactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'saída')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const sidebarItems = [
    { icon: HomeIcon, label: 'Dashboard', id: 'dashboard' },
    { icon: BarChart2Icon, label: 'Analytics', id: 'analytics' },
    { icon: PieChartIcon, label: 'Budgets', id: 'budgets' },
    { icon: UsersIcon, label: 'Accounts', id: 'accounts' },
    { icon: SettingsIcon, label: 'Settings', id: 'settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-100  bg-customColor">
      {/* Sidebar */}
      <aside className="w-64 bg-aside shadow-md">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-100 ">FinanceApp</h1>
        </div>
        <nav className="mt-4 flex flex-col gap-4">
          {/* {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeTab === item.id ? ' text-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-5  h-5 mr-3 text-gray-100" />
              {item.label}
            </button>
          ))} */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto ml-2">
          <h2 className="text-xl font-semibold mt-4 ">Seja bem-vindo!👋</h2>
          <p className="mb-6 text-gray-700">Suas finanças em um único app</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className='rounded-2xl'>
              <CardHeader>
                <CardTitle> entradas e saídas</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">tipo</Label>
                    <Select name="type" value={newTransaction.type} onValueChange={handleTypeChange}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entrada">entrada</SelectItem>
                        <SelectItem value="saída">saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">descrição</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newTransaction.description}
                      onChange={handleInputChange}
                      placeholder="digite a descrição"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">valor</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={handleInputChange}
                      placeholder="informe um valor"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className=" text-center rounded-xl"> adicionar </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className='rounded-2xl'>
              <CardHeader>
                <CardTitle>resumo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 rounde">
                  <Card className="flex flex-col gap-2 justify-center items-center p-4 bg-stone-950 rounded-2xl">
                    <div className="flex items-center">
                    {/* <ArrowUpIcon className="h-8 w-8 text-gray-100 mr-2" /> */}
                      <span className="font-normal opacity-70 text-gray-100">Total de entradas</span>
                    </div>
                    <span className=" text-gray-100">${totalIncome.toFixed(2)}</span>
                  </Card>
                  <Card className="flex flex-col gap-2 justify-center items-center p-4 bg-stone-950 rounded-2xl">
                    <div className="flex items-center">
                      {/* <ArrowDownIcon className="h-8 w-8 text-gray-100 mr-2" /> */}
                      <span className="font-normal opacity-70 text-gray-100">Total de saídas</span>
                    </div>
                    <span className=" text-gray-100">${totalExpenses.toFixed(2)}</span>
                  </Card>
                  <Card className="flex flex-col gap-2 justify-center items-center p-4 bg-stone-950 rounded-2xl">
                    <div className="flex items-center">
                      {/* <DollarSign className="h-8 w-8 text-gray-100 mr-2" /> */}
                      <span className="font-normal opacity-70 text-gray-100">Saldo geral</span>
                    </div>
                    <span className=" text-gray-100">${balance.toFixed(2)}</span>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 rounded-2xl">
            <CardHeader>
              <CardTitle>transações recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>tipo</TableHead>
                    <TableHead>descrição</TableHead>
                    <TableHead className="text-right">valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(-5).reverse().map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.type === 'entrada' ? (
                          <span className="text-green-600">entrada</span>
                        ) : (
                          <span className="text-red-600">saída</span>
                        )}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}