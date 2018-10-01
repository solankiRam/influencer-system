import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from '../constant';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthServiceProvider {

    constructor(public http: HttpClient, private storage: Storage) { }

    // Login
    login(inputparam): Observable<any> {
        // alert(JSON.stringify(inputparam));
        return this.http.post(Constants.baseUrl + 'users/login', inputparam).map(res => {
            // alert(JSON.stringify(res));
            return res
        })
    }

    register(credentials): Observable<any> {
        return this.http.post(Constants.baseUrl + 'admin/Influencers/add', credentials).map(res => res);
    }

    forgotPassword(credentials): Observable<any> {
        return this.http.post(Constants.baseUrl + 'users/forgetpwd/', credentials).map(res => res);
    }

    editInfluencer(credentials, id): Observable<any> {
        return this.http.post(Constants.baseUrl + 'admin/Influencers/edit/' + id, credentials).map(res => res);
    }

    getinfluencerList(data): Observable<any> {
        return this.http.post(Constants.baseUrl + 'admin/influencers/search_user', data).map(res => res)
    }

    getProductNo(data): Observable<any> {
        return this.http.post(Constants.baseUrl + 'admin/installations/get_product_no', data).map(res => res)
    }

    addInfluencer(data): Observable<any> {
        return this.http.post(Constants.baseUrl + 'admin/installations/add', data).map(res => res)
    }

    getinstallationsList(data): Observable<any> {
        return this.http.post(Constants.baseUrl + 'admin/installations/search_user', data).map(res => res)
    }

    getInfluencer(id): Observable<any> {
        return this.http.get(Constants.baseUrl + 'admin/influencers/view/' + id).map(res => res)
    }

    getInfluencerTypes(): Observable<any> {
        return this.http.get(Constants.baseUrl + 'admin/influencerTypes/index').map(res => res)
    }

    comapanyBranches(): Observable<any> {
        return this.http.get(Constants.baseUrl + 'admin/companyBranches/').map(res => res)
    }

    loginData(data): void {
        if (data.id) {
            localStorage.setItem('id', data.id);
        }
        this.storage.set('data', data);
    }

    // Logout
    public logout(): Observable<any> {
        return Observable.create(observer => {
            this.http.get(Constants.baseUrl + 'users/logout')
                .map(res => res)
                .subscribe(data => {
                    observer.next(true);
                    this.clearAll();
                    observer.complete();
                });
        });
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