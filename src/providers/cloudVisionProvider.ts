import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from './constant';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class GoogleCloudVisionServiceProvider {
    constructor(public http: HttpClient) { }
    getLabels(base64Image) {
        const body = {
            "requests": [
                {
                    "image": {
                        "content": base64Image
                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION",
                            "maxResults":1
                        }
                    ]
                }
            ]
        }
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + Constants.cloudVision, body);
    }
}