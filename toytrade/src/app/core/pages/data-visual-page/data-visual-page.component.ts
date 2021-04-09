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
        link.href = "../../.././../assets/csv/test.csv";
        link.click();
      }, 2000);
    });
  }

  public async onClickCategoriesButton() {
    console.log("onClickCategoriesButton");
    this.httpService.getCategoriesCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "categoriesData";
        link.href = "../../.././../assets/csv/categories.csv";
        link.click();
      }, 2000);
    });
  }

  public async onClickUserRequestsButton() {
    console.log("onClickUserRequestsButton");
    this.httpService.getUserRequestsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "userRequestsData";
        link.href = "../../.././../assets/csv/user_requests.csv";
        link.click();
      }, 2000);
    });
  }

}
