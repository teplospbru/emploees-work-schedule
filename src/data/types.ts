// входной тип данных (сотрудник, магазин, роль, с_дата_время, по_дата_время)
export interface Data {
  emploee: string;
  shop: string;
  role: string;
  from: string;
  to: string;
}

// данные рабочей смены
export interface WorkingShift {
  day_1: string;
  day_2: string;
  fromUTC: string;
  toUTC: string;
  emploee: string;
  role: string;
  from: string;
  to: string;
  type: 'plan' | 'fact';
}

export interface Shops {
  shop: string;
  data: WorkingShift[];
}

// Рабочие смены конкретного работника
export interface WorkShifts {
  name: string;
  workingShifts: WorkingShift[];
}

// список работников с рабочими сменами для конкретного магазина
export interface EmploeesData {
  shop: string;
  data: WorkShifts[];
}

// ответ от api
export interface Response {
  dateList: string[];
  emploeesData: EmploeesData[];
  shopList: string[];
}
