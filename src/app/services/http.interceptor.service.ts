import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('Authorization')) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc3NpZ25tZW50IiwiaWF0IjoxNjY2OTM1MzUyLCJleHAiOjE2NjcwMjE3NTJ9.obHwE6GI_C8cmMEkVt0uyhD6XUaNEsseIb4coRf8fwrI404IOvaJGjTYtzxXYIOWkBeKh0I4Hpv9FQlShA0ZMg');
            req = req.clone({ headers })
        }
        const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc3NpZ25tZW50IiwiaWF0IjoxNjY2OTM1MzUyLCJleHAiOjE2NjcwMjE3NTJ9.obHwE6GI_C8cmMEkVt0uyhD6XUaNEsseIb4coRf8fwrI404IOvaJGjTYtzxXYIOWkBeKh0I4Hpv9FQlShA0ZMg');
        req = req.clone({ headers })
        return next.handle(req);
    }
}