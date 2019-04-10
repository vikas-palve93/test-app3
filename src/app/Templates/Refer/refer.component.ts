import { Component, OnInit, Input } from '@angular/core';
import { ReferService } from './../../Services/refer.service';
import { ToastrService } from 'ngx-toastr'
import * as $ from 'jquery'

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css']
})
export class ReferComponent implements OnInit {

  @Input() referModal;
  @Input() link;
  isLoaderStarted = false;

  constructor(
    private referService: ReferService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  getReferralLink() {
    this.isLoaderStarted = true;
    this.referService.getReferralLinkAPI().subscribe(
      (res: any) => {
        this.isLoaderStarted = false;
      },
      (err: any) => {
        this.isLoaderStarted = false;
      }
    )
  }

  copyLink(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Copied to clipboard");
    $("#referModal").click();
  }

}
