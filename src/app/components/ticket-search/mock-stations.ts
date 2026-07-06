export interface Station {
  id: string;
  name: string;
  city: string;
}

export const MOCK_STATIONS: Station[] = [
  { id: '1', name: 'Łódź Fabryczna', city: 'Łódź' },
  { id: '2', name: 'Łódź Widzew', city: 'Łódź' },
  { id: '3', name: 'Kutno', city: 'Kutno' },
  { id: '4', name: 'Bydgoszcz Główna', city: 'Bydgoszcz' },
  { id: '5', name: 'Bydgoszcz Wschód', city: 'Bydgoszcz' },
  { id: '6', name: 'Warszawa Centralna', city: 'Warszawa' },
  { id: '7', name: 'Toruń Główny', city: 'Toruń' }
];