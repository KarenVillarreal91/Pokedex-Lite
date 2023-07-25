import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogged:any;
  users:any;
  allPokemon:any;

  constructor(private firestore:AngularFirestore) 
  {
    this.getCollection('users').subscribe((data)=>{
      this.users = data;
    });

    this.getCollection('pokemon').subscribe((data)=>{
      this.allPokemon = data;
    });
  }

  login(user:any)
  {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, user.name + '@pokedex.com', user.password);
  }

  logOut()
  {
    const auth = getAuth();
    return signOut(auth);
  }

  getCurrentUser()
  {
    for(let user of this.users)
    {
      if(user.username == this.userLogged)
      {
        this.userLogged = user;
        break;
      }
    }
  }

  getCollection(collection:string)
  {
    return this.firestore.collection<any>(collection).valueChanges({idField: "id"});
  }

  uploadCollection(collection:string, data:any)
  {
    return this.firestore.collection(collection).add(data);
  }

  editCollection(data:any, collection:string, docId:string)
  {
    return this.firestore.collection(collection).doc(docId).update(data);
  }
}
