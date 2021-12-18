import doctor from "./doctor.json";
import grooming from "./grooming.json";
import shop from "./shop.json";

const dbData = [doctor, grooming, shop];

export enum fakeDBTableName{
  "doctor", "grooming", "shop"
}

export const fakeDb = {
  findItemById: (dbName: fakeDBTableName, id: string)=>{
    const dbs = dbData[dbName];
    for (const dbItem of dbs) {
      if( dbItem?.id === id ) return dbItem;
    }
  },
  filterItemByCategory: (dbName: fakeDBTableName, category: string)=>{
    const dbs = dbData[dbName];
    return dbs.filter((el)=>el?.category?.includes(category) );
  },
  filterMerchantByName: (dbName: fakeDBTableName, name: string)=>{
    const dbs = dbData[dbName];
    return dbs.filter((el)=>el?.name?.match(new RegExp(name, "gi")) );
  },
  filterItemByName: (dbName: fakeDBTableName, name: string)=>{
    const dbs = dbData[dbName];
    const res: {
      id: string,
      name: string,
      price: number,
      description: string,
      merchantName?: string
    }[] = [];
    dbs.forEach( merchant => {
      merchant.items.forEach( item => {
        if( item.name?.match(new RegExp(name, "gi")) )
          res.push({...item, merchantName: merchant.name});
      } )
    } )
    return res;
  }
}