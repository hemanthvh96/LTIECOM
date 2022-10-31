import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('Auth_Token')) {
            const jwt = localStorage.getItem('Auth_Token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
            req = req.clone({ headers })
        }
        return next.handle(req);
    }
}