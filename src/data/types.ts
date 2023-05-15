// Тип данных (сотрудник, магазин, роль, с_дата_время, по_дата_время)
export interface Data {
    emploee: string;
    shop: string;
    role: string;
    from: string;
    to: string;
}

export interface WorkingShift {
    day_1: string;
    day_2: string;
    emploee: string;
    role: string;
    from: string;
    to: string;
    type: 'plan' | 'fact';
}

export interface Shops {
    shop: string;
    data: WorkingShift[] 
}

export interface WorkShifts {
    name: string;
    workingShifts: WorkingShift[]
}

export interface EmploeesData {
    shop: string;
    data: WorkShifts[]
}

export interface Response {
    dateList: string[];
    emploeesData: EmploeesData[];
    shopList: string[];
}