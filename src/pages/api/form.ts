import { initializeApp } from "firebase/app";
import {
 getFirestore,
 addDoc,
 collection,
 Timestamp 
} from '@firebase/firestore/lite';
import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseConfig } from "@/config/firebase";

type Data = {
  success?: boolean,
  id?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  if( req.method === "POST" ){
    const {name, email} = req.body;

    if( !name || !email ) return res.status(400).json({success: false})

    try {
      const docRef = await addDoc(collection(firestore, 'guests'), {
        name: name,
        email: email,
        time: Timestamp.now()
      })
      res.status(200).json({ id: docRef.id, success: true })
    } catch (error) {
      res.status(500).json({ success: false })
    }
  }
  else
    res.status(405).json({ success: false })
}