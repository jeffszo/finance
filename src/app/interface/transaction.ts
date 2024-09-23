

export interface ITransaction {
    id: number;
    type: 'entrada' | 'saída';
    description: string;
    amount: number; 
  }