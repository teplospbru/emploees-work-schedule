import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { fact } from "./fact";
import { plan } from "./plan";
import { EmploeesData, Shops, Response } from './types';

export const getExploees = () => {
    return new Promise((resolve, reject) => {
        try {
            const arr: string[] = [];

            // извлекаем название магазинов
            plan.forEach(({shop}) => {
                if(!arr.includes(shop)) {
                    arr.push(shop)
                }
            });

            fact.forEach(({shop}) => {
                if(!arr.includes(shop)) {
                    arr.push(shop)
                }
            });

            arr.sort();

            // распределяем объекты по магазинам
            const shops: Shops[] = arr.map(item => ({shop: item, data: []}));

            dayjs.locale('ru');

            plan.forEach((item) => {
                const index = shops.findIndex(({shop}) => shop === item.shop);

                shops[index].data.push({
                    ...item, 
                    type: 'plan',
                    day_1: dayjs(item.from).format('YYYY-MM-DD'), 
                    day_2: dayjs(item.from).format('D MMMM YYYY'),
                });

            });

            fact.forEach((item) => {
                const index = shops.findIndex(({shop}) => shop === item.shop);

                shops[index].data.push({
                    ...item, 
                    type: 'fact',
                    day_1: dayjs(item.from).format('YYYY-MM-DD'), 
                    day_2: dayjs(item.from).format('D MMMM YYYY'),
                });

            });

            // получаем список дат
            const dateList: string[] = [];

            shops.forEach(shop => {
                shop.data.forEach(item => {
                    if(!dateList.includes(item.day_1)) {
                        dateList.push(item.day_1)
                    }
                })
            })

            dateList.sort();

            // сортируем рабочих в магазинах
            const emploeesData: EmploeesData[] = [];

            shops.forEach(shop => {
                const emploees: string[] = [];
                const obj: EmploeesData = {
                    shop: shop.shop,
                    data: [],
                }

                shop.data.forEach(({ emploee }) => {
                    if(!emploees.includes(emploee)) {
                        emploees.push(emploee)
                    }
                });

                emploees.sort();

                emploees.forEach(emploee => {
                    const a = shop.data.filter(item => item.emploee === emploee);
                    a.sort((a,b) => a.day_1 < b.day_1 ? -1 : 1);
                    obj.data.push({
                        name: emploee,
                        workingShifts: [...a]
                    });

                });

                emploeesData.push(obj);
            })

            const response: Response = {
                dateList: dateList,
                emploeesData: emploeesData,
                shopList: arr,
            }

            resolve(response);
        } catch(e) {
            reject(new Error('Ошибка парсинга расписаний!'))
        }
    })
}