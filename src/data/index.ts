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
  filterItemByName: (dbName: fakeDBTableName, name: string)=>{
    const dbs = dbData[dbName];
    return dbs.filter((el)=>el?.name?.match(new RegExp(name, "gi")) );
  }
}