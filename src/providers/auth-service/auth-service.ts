import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from '../constant';

@Injectable()
export class AuthServiceProvider {

    constructor(public http: Http, private storage: Storage) { }

    // Login
    login(inputparam): Observable<any> {
        // alert(JSON.stringify(inputparam));
        return this.http.post(Constants.baseUrl + 'users/login', inputparam).map(res => {
            // alert(JSON.stringify(res));
            return res.json()
        })
    }

    register(credentials) {
        return this.http.post(Constants.baseUrl + 'admin/Influencers/add', credentials).map(res => res.json());
    }

    forgotPassword(credentials) {
        return this.http.post(Constants.baseUrl + 'users/forgetpwd/', credentials).map(res => res.json());
    }

    editInfluencer(credentials, id) {
        return this.http.post(Constants.baseUrl + 'admin/Influencers/edit/' + id, credentials).map(res => res.json());
    }

    getinfluencerList(data) {
        return this.http.post(Constants.baseUrl + 'admin/influencers/search_user', data).map(res => res.json())
    }

    getInfluencer(id) {
        return this.http.get(Constants.baseUrl + 'admin/influencers/view/' + id).map(res => res.json())
    }

    getInfluencerTypes() {
        return this.http.get(Constants.baseUrl + 'admin/influencerTypes/index').map(res => res.json())
    }

    comapanyBranches() {
        return this.http.get(Constants.baseUrl + 'admin/companyBranches/').map(res => res.json())
    }

    loginData(data): void {
        if (data.id) {
            localStorage.setItem('id', data.id);
        }
        this.storage.set('data', data);
    }

    logout() {
        return new Promise(resolve => {
            this.clearAll()
            resolve(true);
        })
    }

    clearAll() {
        localStorage.clear();
        this.storage.remove('data');
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