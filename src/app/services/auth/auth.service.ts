import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';
import { DatabaseService } from '../database/database.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private db: DatabaseService) { }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(
        (user) => {
          console.log('reading db');
          this.db.searchUser(user.user.email).subscribe((userData) => {
            console.log(`result ${user}`);
            if (userData.length) {
              resolve(userData[0]);
            } else {
              reject({message: 'User not found', code: -1});
            }
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  register(newUserInfo: User, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.db.searchUser(newUserInfo.email).subscribe((userData) => {
        if (!userData.length) {
          this.fireAuth.auth.createUserWithEmailAndPassword(newUserInfo.email, password).then(() => {
            this.db.addUser(newUserInfo);
            resolve(newUserInfo);
          },
          (error) => {
            reject(error);
          });
        } else {
          reject({message: 'This email is already in use', code: -2});
        }
      });
    });
  }

  logout() {
    this.fireAuth.auth.signOut().then( () => {},
    (err) => {
      console.log(err);
    });
  }

  getUser() {
    return this.fireAuth.user;
  }
}
