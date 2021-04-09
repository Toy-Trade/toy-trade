import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-data-visual-page',
  templateUrl: './data-visual-page.component.html',
  styleUrls: ['./data-visual-page.component.css']
})
export class DataVisualPageComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
  }

  public async onClickBrandsButton() {
    console.log("onClickBrandsButton");
    this.httpService.getBrandsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "brandsData";
        link.href = "../../.././../assets/csv/brands.csv";
        link.click();
      }, 2000);
    });
  }

  public async onClickToyRequestsButton() {
    console.log("onClickToyRequestsButton");
    this.httpService.getToyRequestsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "toyRequestsData";
        link.href = "../../.././../assets/csv/toyrequests.csv";
        link.click();
      }, 2000);
    });
  }

}
