import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useState } from 'react';
import { ITransaction } from '../interface/transaction';




export default function Main () {

  const [transactions, setTransactions] = useState<ITransaction[]>([]); 
  const [newTransaction, setNewTransaction] = useState<{
    type: 'entrada' | 'saída'; 
    description: string;
    amount: string; 
  }>({
    type: 'entrada',
    description: '',
    amount: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: 'entrada' | 'saída') => { 
    setNewTransaction(prev => ({ ...prev, type: value }));
  };

 
  const totalIncome = transactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'saída')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTransaction.description && newTransaction.amount) {
      setTransactions(prev => [
        ...prev,
        {
          id: prev.length + 1,
          type: newTransaction.type,
          description: newTransaction.description,
          amount: parseFloat(newTransaction.amount), 
        }
      ]);
      
      setNewTransaction({ type: 'entrada', description: '', amount: '' });
    }
  };



    return (
        <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto ml-2">
          <h2 className="text-xl font-semibold mt-4">Seja bem-vindo!👋</h2>
          <p className="mb-6 text-gray-700">Suas finanças em um único app</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className='rounded-2xl'>
              <CardHeader>
                <CardTitle>Entradas e Saídas</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select name="type" value={newTransaction.type} onValueChange={handleTypeChange}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entrada">Entrada</SelectItem>
                        <SelectItem value="saída">Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newTransaction.description}
                      onChange={handleInputChange}
                      placeholder="Digite a descrição"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={handleInputChange}
                      placeholder="Informe um valor"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="text-center rounded-xl">Adicionar</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className='rounded-2xl'>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 rounded">
                  <Card className="flex flex-col gap-2 justify-center items-center p-4 bg-stone-950 rounded-2xl">
                    <div className="flex items-center">
                      <span className="font-normal opacity-70 text-gray-100">Total de Entradas</span>
                    </div>
                    <span className="text-gray-100">${totalIncome.toFixed(2)}</span>
                  </Card>
                  <Card className="flex flex-col gap-2 justify-center items-center p-4 bg-stone-950 rounded-2xl">
                    <div className="flex items-center">
                      <span className="font-normal opacity-70 text-gray-100">Total de Saídas</span>
                    </div>
                    <span className="text-gray-100">${totalExpenses.toFixed(2)}</span>
                  </Card>
                  <Card className="flex flex-col gap-2 justify-center items-center p-4 bg-stone-950 rounded-2xl">
                    <div className="flex items-center">
                      <span className="font-normal opacity-70 text-gray-100">Saldo Geral</span>
                    </div>
                    <span className="text-gray-100">${balance.toFixed(2)}</span>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 rounded-2xl">
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(-5).reverse().map(transaction => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.type === 'entrada' ? (
                          <span className="text-green-600">Entrada</span>
                        ) : (
                          <span className="text-red-600">Saída</span>
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
    )
}