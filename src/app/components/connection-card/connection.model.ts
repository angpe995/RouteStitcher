export interface SeatInfo {
  car: string;     // Номер вагона
  seat: string;    // Номер місця
}

export interface JourneySegment {
  fromStation: string;
  toStation: string;
  
  trainBrand: string;
  trainId: string;
  
  hasSeat: boolean;
  seatInfo?: SeatInfo;
  
  departureTime?: string;
  arrivalTime?: string;
}

export interface ConnectionDetail {
  id: string;
  startTime: string;
  endTime: string;
  duration?: string;
  segments: JourneySegment[];

}

function timeToMinutes(timeStr: string): number {

  const [hours, minutes] = timeStr.split(':').map(Number);

  return (hours * 60) + minutes;

}



function minutesToTime(totalMinutes: number): string {

  const isNegative = totalMinutes < 0;

  const absMinutes = Math.abs(totalMinutes);



  const hours = Math.floor(absMinutes / 60);

  const minutes = absMinutes % 60;



  const formattedHours = String(hours).padStart(2, '0');

  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${isNegative ? '-' : ''}${formattedHours}:${formattedMinutes}`;

}

export function calculateDuration(startTime: string, endTime: string): string {

  const startMinutes = timeToMinutes(startTime);

  const endMinutes = timeToMinutes(endTime);

  const diff = endMinutes - startMinutes;

  return minutesToTime(diff);

}

export const MOCK_CONNECTIONS: ConnectionDetail[] = [
  {
    id: '1',
    startTime: '16:40',
    endTime: '19:46',
    segments: [
      {
        fromStation: 'Katowice',
        toStation: 'Gdańsk Główny',
        trainBrand: 'IC',
        trainId: 'IC-4520',
        hasSeat: true,
        seatInfo: { car: '4', seat: '22' }
      }
    ],
  },
  {
    id: '2',
    startTime: '16:40',
    endTime: '22:15',
    // Прямий рейс, але на другій частині шляху втрачається гарантія місця (Katowice -> Kutno -> Gdańsk)
    segments: [
      {
        fromStation: 'Katowice',
        toStation: 'Kutno',
        trainBrand: 'PR',
        trainId: 'PR-44111',
        hasSeat: true,
        seatInfo: { car: '1', seat: '15' }
      },
      {
        fromStation: 'Kutno',
        toStation: 'Gdańsk Główny',
        trainBrand: 'PR',
        trainId: 'PR-44111',
        hasSeat: false // brak gwarancji miejsca
      }
    ]
  },
  {
    id: '3',
    startTime: '06:15',
    endTime: '11:45',
    // Прямий рейс, але зі зміною місця посеред шляху (Katowice -> Warszawa -> Gdańsk)
    segments: [
      {
        fromStation: 'Katowice',
        toStation: 'Warszawa Centralna',
        trainBrand: 'EIP',
        trainId: 'EIP-4500',
        hasSeat: true,
        seatInfo: { car: '2', seat: '11' }
      },
      {
        fromStation: 'Warszawa Centralna',
        toStation: 'Gdańsk Główny',
        trainBrand: 'EIP',
        trainId: 'EIP-4500',
        hasSeat: true,
        seatInfo: { car: '2', seat: '15' } // Потяг той самий, але пасажир має пересісти
      }
    ]
  },
  {
    id: '4',
    startTime: '08:20',
    endTime: '14:15',
    // Класична пересадка з потяга InterCity на регіональний Polregio
    segments: [
      {
        fromStation: 'Katowice',
        toStation: 'Kraków Główny',
        trainBrand: 'IC',
        trainId: 'IC-38100',
        hasSeat: true,
        seatInfo: { car: '5', seat: '71' }
      },
      {
        fromStation: 'Kraków Główny',
        toStation: 'Tarnów',
        trainBrand: 'PR',
        trainId: 'PR-39393',
        hasSeat: false // Регіональні потяги часто без резервації місць
      }
    ]
  },
  {
    id: '5',
    startTime: '11:00',
    endTime: '18:30',
    // Пересадка: спочатку їдемо без місця, потім пересідаємо на інший потяг з місцем
    segments: [
      {
        fromStation: 'Warszawa Centralna',
        toStation: 'Poznań Główny',
        trainBrand: 'IC',
        trainId: 'IC-1810',
        hasSeat: false // Немає вільних місць на цей відрізок
      },
      {
        fromStation: 'Poznań Główny',
        toStation: 'Szczecin Główny',
        trainBrand: 'TLK',
        trainId: 'TLK-88123',
        hasSeat: true,
        seatInfo: { car: '7', seat: '44' }
      }
    ]
  },
  {
    id: '6',
    startTime: '22:00',
    endTime: '07:30',
    // Складний нічний маршрут: зміна місця, потім втрата місця, і на кінець пересадка
    segments: [
       {
        fromStation: 'Wrocław Główny',
        toStation: 'Opole Główne',
        trainBrand: 'IC',
        trainId: 'IC-6310',
        hasSeat: true,
        seatInfo: { car: '1', seat: '14' }
       },
       {
        fromStation: 'Opole Główne',
        toStation: 'Kraków Główny',
        trainBrand: 'IC',
        trainId: 'IC-6310',
        hasSeat: true,
        seatInfo: { car: '2', seat: '81' } // Зміна вагона і місця
       },
       {
        fromStation: 'Kraków Główny',
        toStation: 'Rzeszów Główny',
        trainBrand: 'IC',
        trainId: 'IC-6310',
        hasSeat: false // Далі квиток без гарантії місця
       },
       {
        fromStation: 'Rzeszów Główny',
        toStation: 'Przemyśl Główny',
        trainBrand: 'PR',
        trainId: 'PR-11002',
        hasSeat: false // Пересадка на ранкову електричку
       }
    ]
  }
];