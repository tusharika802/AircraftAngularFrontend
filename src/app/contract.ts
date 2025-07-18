export interface Contract {
  id?: number;
  title: string;
  isActive: boolean;
  partnerIds: number[]; 
partnerNames?: string; 
}