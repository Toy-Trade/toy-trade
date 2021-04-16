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

  public onClickBrandsButton() {
    document.getElementById("brandsButton").style.cursor = "wait";
    console.log("onClickBrandsButton");
    this.httpService.getBrandsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "brandsData";
        link.href = "../../.././../assets/csv/brands.csv";
        link.click();
        document.getElementById("brandsButton").style.cursor = "initial";
      }, 2000);
    });
  }

  public onClickAgesButton() {
    document.getElementById("agesButton").style.cursor = "wait";
    console.log("onClickAgesButton");
    this.httpService.getAgeRangeCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "agesData";
        link.href = "../../.././../assets/csv/ageRange.csv";
        link.click();
        document.getElementById("agesButton").style.cursor = "initial";
      }, 2000);
    });
  }
  public onClickTypicalToysButton() {
    document.getElementById("typicalToysButton").style.cursor = "wait";
    console.log("onClickTypicalToysButton");
    this.httpService.getAgeRangeCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "toysListedData";
        link.href = "../../.././../assets/csv/userToys.csv";
        link.click();
        document.getElementById("typicalToysButton").style.cursor = "initial";
      }, 2000);
    });
  }

  public onClickToyRequestsButton() {
    document.getElementById("toyRequestsButton").style.cursor = "wait";
    console.log("onClickToyRequestsButton");
    this.httpService.getToyRequestsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "toyRequestsData";
        link.href = "../../.././../assets/csv/toyrequests.csv";
        link.click();
        document.getElementById("toyRequestsButton").style.cursor = "initial";
      }, 2000);
    });
  }

  public onClickCategoriesButton() {
    document.getElementById("categoriesButton").style.cursor = "wait";
    console.log("onClickCategoriesButton");
    this.httpService.getCategoriesCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "categoriesData";
        link.href = "../../.././../assets/csv/categories.csv";
        link.click();
        document.getElementById("categoriesButton").style.cursor = "initial";
      }, 2000);
    });
  }

  public onClickUserRequestsButton() {
    document.getElementById("userRequestsButton").style.cursor = "wait";
    console.log("onClickUserRequestsButton");
    this.httpService.getUserRequestsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "userRequestsData";
        link.href = "../../.././../assets/csv/user_requests.csv";
        link.click();
        document.getElementById("userRequestsButton").style.cursor = "initial";
      }, 2000);
    });
  }

  public async onClickConditionsButton() {
    console.log("onClickConditionsButton");
    this.httpService.getConditionsCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "conditionsData";
        link.href = "../../.././../assets/csv/conditions.csv";
        link.click();
      }, 2000);
    });
  }

  public async onClickSentMessagesButton() {
    console.log("onClickSentMessagesButton");
    this.httpService.getSentMessagesCSV().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        let link = document.createElement("a");
        link.download = "sentMessagesData";
        link.href = "../../.././../assets/csv/sentmessages.csv";
        link.click();
      }, 2000);
    });
  }
  
}