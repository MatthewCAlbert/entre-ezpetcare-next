import doctor from "./doctor.json";
import grooming from "./grooming.json";
import shop from "./shop.json";

const dbData = [doctor, grooming, shop];

export enum fakeDBTableName{
  "doctor", "grooming", "shop"
}

export const fakeDb = {
  findMerchantById: (dbName: fakeDBTableName, id: string)=>{
    const dbs = dbData[dbName];
    for (const dbItem of dbs) {
      if( dbItem?.id === id ) return dbItem;
    }
  },
  filterMerchantByCategory: (dbName: fakeDBTableName, category: string)=>{
    const dbs = dbData[dbName];
    return dbs.filter((el)=>el?.category?.includes(category) );
  },
  filterMerchantByName: (dbName: fakeDBTableName, name: string)=>{
    const dbs = dbData[dbName];
    return dbs.filter((el)=>el?.name?.match(new RegExp(name, "gi")) );
  },
  filterMerchantById: (dbName: fakeDBTableName, id: string)=>{
    const dbs = dbData[dbName];
    return dbs.filter((el)=>el?.id === id )?.[0];
  },
  filterItemByName: (dbName: fakeDBTableName, name: string)=>{
    const dbs = dbData[dbName];
    const res: {
      id: string,
      name: string,
      price: number,
      description: string,
      merchantName?: string,
      merchantId?: string,
    }[] = [];
    dbs.forEach( merchant => {
      merchant.items.forEach( item => {
        if( item.name?.match(new RegExp(name, "gi")) )
          res.push({...item, merchantName: merchant.name, merchantId: merchant.id});
      } )
    } )
    return res;
  },
  findItemById: (dbName: fakeDBTableName, id: string)=>{
    const dbs = dbData[dbName];
    for (const merchant of dbs) {
      for (const item of merchant.items) {
        if( item.id === id)
          return {...item, merchantName: merchant.name, merchantId: merchant.id};
      }
    }
    return null;
  }
}