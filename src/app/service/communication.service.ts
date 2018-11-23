import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor() { }
  private subject = new Subject<any>();
  keyVal:any;
  id:any;
  pid:any;
  pdate:any;
  pname:any;
  pquan:any;
  pprice:any;
  pgst:any;
  ptot:any;

 
    sendMessage(message: any, uid, pid, pdate, pname, pquan, pprice, pgst, ptot) {
        this.subject.next({text: message, uid});
        this.keyVal=message;
        this.id = uid;
        this.pid =pid;
        this.pdate=pdate;
        this.pname=pname;
        this.pquan=pquan;
        this.pprice=pprice;
        this.pgst=pgst;
        this.ptot=ptot;
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
      console.log("get comm" +this.subject.asObservable(), +Object.prototype.toString.call(this.subject.asObservable()));
      //JSON.stringify
      console.log("val" +this.keyVal)
     // var chr = this.subject.asObservable();
  //return this.keyVal;
        return this.subject.asObservable();
    }

 
}
