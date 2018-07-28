import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

    // Change to this http://ed43bb3b.ngrok.io/api/login
    static readonly LOGIN_URL = 'http://54.71.128.110/influencer_system_api/users/login';
    // Change to this http://ed43bb3b.ngrok.io/api/register
    static readonly REGISTER_URL = 'http://54.71.128.110/influencer_system_api/admin/Influencers/add';
    static readonly EDIT_URL = 'http://54.71.128.110/influencer_system_api/admin/Influencers/edit/';
    static readonly getInfluencer = 'http://54.71.128.110/influencer_system_api/admin/influencers/search_user';
    static readonly getSingleInfluencer = 'http://54.71.128.110/influencer_system_api/admin/influencers/view/';

    access: boolean;
    token: string;

    constructor(public http: Http, private storage: Storage) { }

    // Login
    public login(credentials) {
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw("Please insert credentials.");
        } else {
            return Observable.create(observer => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                this.http.post(AuthServiceProvider.LOGIN_URL, credentials, { headers: headers })
                    .map(res => res.json())
                    .subscribe(data => {
                        observer.next(data.data);
                    });

            }, err => console.error(err));
        }
    }
    // Register
    public register(credentials) {
        if (credentials.name === null || credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                this.http.post(AuthServiceProvider.REGISTER_URL, credentials)
                    .map(res => res.json())
                    .subscribe(data => {
                        console.log(data);
                    });
                observer.next(true);
                observer.complete();
            });
        }
    }

    public editInfluencer(credentials, id) {
        return Observable.create(observer => {
            this.http.post(AuthServiceProvider.EDIT_URL + id, credentials)
                .map(res => res.json())
                .subscribe(data => {
                    observer.next(true);
                    observer.complete();
                });

        });
    }
    // Get Token
    public getToken() {
        return 'hjghghj123456';
    }

    loginData(data): void {
        console.log(data)
        if (data.id) {
            localStorage.setItem('id', data.id);
        }
        this.storage.set('data', data);
    }

    // Logout
    public logout() {
        return Observable.create(observer => {
            observer.next(true);
            this.clearAll();
            observer.complete();
        });
    }

    clearAll() {

        localStorage.clear();
        this.storage.remove('data');
        localStorage.clear();
    }

    public getinfluencerList(data) {
        return Observable.create(observer => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(AuthServiceProvider.getInfluencer, data, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    observer.next(data);
                });
        }, err => console.error(err));
    }
    public searchUser(data) {
        return Observable.create(observer => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(AuthServiceProvider.getInfluencer, data, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    observer.next(data);
                });
        }, err => console.error(err));
    }

    public getInfluencer(id) {
        return Observable.create(observer => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.get(AuthServiceProvider.getSingleInfluencer + id)
                .map(res => res.json())
                .subscribe(data => {
                    observer.next(data);
                });
        }, err => console.error(err));
    }

    authenticated() {
        return new Promise(resolve => {
            this.storage.get('data').then(token => {
                if (token == null) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}