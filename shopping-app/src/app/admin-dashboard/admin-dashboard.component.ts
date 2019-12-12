import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  catAddForm: FormGroup;
  catSearchForm: FormGroup;
  subCatSearchForm: FormGroup;
  subCatAddForm: FormGroup;
  allCatList: any;
  allSubCatList: any;
  catStatus: number = 0;
  constructor(private httpobj: HttpClient,private router: Router) { }

  ngOnInit() {
    $('#firstNav').hide();
    
    this.catAddForm = new FormGroup({
      catName: new FormControl('', Validators.required),
      catDesc: new FormControl('', Validators.required)
    });

    this.catSearchForm = new FormGroup({
      searchCat: new FormControl('', Validators.required)
    });

    this.subCatAddForm = new FormGroup({
      subCatName: new FormControl('', Validators.required),
      subCatDesc: new FormControl('', Validators.required),
      selectCat: new FormControl('', Validators.required)
    });

    this.subCatSearchForm = new FormGroup({
      searchSubCat: new FormControl('', Validators.required)
    });

    let allCat=this.httpobj.get("http://localhost:8080/category/all");
    allCat.subscribe((response)=>{ this.allCatList=response; 
    console.log(this.allCatList);
  });

    let allSubCat=this.httpobj.get("http://localhost:8080/subcategory/all");
    allSubCat.subscribe((response)=>{ this.allSubCatList=response; 
    console.log(this.allSubCatList);
  });
  // $('.mdb-select').materialSelect();
  }

  get catName() {
    return this.catAddForm.get('catName');
  }

  get catDesc() {
    return this.catAddForm.get('catDesc');
  }

  get searchCat() {
    return this.catSearchForm.get('searchCat');
  }

  get subCatName() {
    return this.subCatAddForm.get('subCatName');
  }

  get subCatDesc() {
    return this.subCatAddForm.get('subCatDesc');
  }

  get selectCat() {
    return this.subCatAddForm.get('selectCat');
  }

  get searchSubCat() {
    return this.subCatSearchForm.get('searchSubCat');
  }

  generateAddBtn(catId){
    // console.log("catName : "  + this.catName.value + ", catDesc : " + this.catDesc.value);
    if(this.catName.value != null && this.catName.value != "" && this.catDesc.value != null && this.catDesc.value != ""){
      $('#addCatBtn').fadeIn();
      $('#addCatBtn'+catId).fadeIn();
    } else {
      $('#addCatBtn').fadeOut();
      $('#addCatBtn'+catId).fadeOut();
    }
  }

  resetField(param){
    $('#addCatBtn').fadeOut();
    $('#addCatBtn'+param).fadeOut();
    $('#addSubCatBtn').fadeOut();
    $('#addSubCatBtn'+param).fadeOut();
  }

  addCategory(param){
    console.log("category data : " + param.value.catName);
    this.catStatus = 1;
    let catData=this.httpobj.post("http://localhost:8080/category/add", param.value);
    catData.subscribe(()=>{
      this.resetField(0);
      $("[type=reset]").click();
      $("[data-dismiss=modal]").click();
      $('#showCatAddSuccess').click();
      this.ngOnInit();
  });

  }

  editCategory(param, catId){
    console.log("catId : " + catId);
    console.log("catName : "  + param.value.catName + ", catDesc : " + param.value.catDesc);
    // console.log("catName : "  + this.catName.value + ", catDesc : " + this.catDesc.value);
    this.catStatus = 2;
    let catData=this.httpobj.put("http://localhost:8080/category/edit/"+catId, param.value);
    catData.subscribe(()=>{
      this.resetField(0);
      $("[type=reset]").click();
      $("[data-dismiss=modal]").click();
      $('#showCatAddSuccess').click();
      this.ngOnInit();
  });
    
  }

  deleteCategory(catId){
    this.catStatus = 3;
    let catData=this.httpobj.delete("http://localhost:8080/category/delete/"+catId);
    catData.subscribe(()=>{
      $("[data-dismiss=modal]").click();
      $('#showCatAddSuccess').click();
      this.ngOnInit();
  });
  }

  searchCatData(param){
    console.log("search : " + param.value.searchCat);
    if(param.value.searchCat != "" && param.value.searchCat != null){
      let catData=this.httpobj.get("http://localhost:8080/category/search/"+param.value.searchCat);
      catData.subscribe((response)=>{ this.allCatList=response; 
      console.log(this.allCatList);
  });
    } else {
      this.ngOnInit();
    }
    
  }

  generateSubCatAddBtn(subCatId){
    if(this.subCatName.value != null && this.subCatName.value != "" && this.subCatDesc.value != null && this.subCatDesc.value != ""){
      $('#addSubCatBtn').fadeIn();
      $('#addSubCatBtn'+subCatId).fadeIn();
    } else {
      $('#addSubCatBtn').fadeOut();
      $('#addSubCatBtn'+subCatId).fadeOut();
    }
  }

  addSubCategory(param){
    console.log("sub category data : " + param.value.subCatName + ", " + param.value.selectCat + ", " + param.value.subCatDesc);
    this.catStatus = 1;
    let catData=this.httpobj.post("http://localhost:8080/subcategory/add/"+param.value.selectCat, param.value);
    catData.subscribe(()=>{
      this.resetField(0);
      $("[type=reset]").click();
      $("[data-dismiss=modal]").click();
      $('#showSubCatAddSuccess').click();
      this.ngOnInit();
  });
  }

  editSubCategory(param, subCatId){
    console.log("subCatId : " + subCatId);
    console.log("subCatName : "  + param.value.subCatName + ", subCatDesc : " + param.value.subCatDesc + ", catId : " + param.value.selectCat);
    // console.log("catName : "  + this.catName.value + ", catDesc : " + this.catDesc.value);
    this.catStatus = 2;
    let catData=this.httpobj.put("http://localhost:8080/subcategory/edit/"+subCatId+"/"+param.value.selectCat, param.value);
    catData.subscribe(()=>{
      this.resetField(0);
      $("[type=reset]").click();
      $("[data-dismiss=modal]").click();
      $('#showSubCatAddSuccess').click();
      this.ngOnInit();
  });
    
  }

  subCategoryDelete(subCatId){
    this.catStatus = 3;
    let catData=this.httpobj.delete("http://localhost:8080/subcategory/delete/"+subCatId);
    catData.subscribe(()=>{
      $("[data-dismiss=modal]").click();
      $('#showSubCatAddSuccess').click();
      this.ngOnInit();
  });
  }

  searchSubCatData(param){
    console.log("search : " + param.value.searchSubCat);
    
    if(param.value.searchSubCat != "" && param.value.searchSubCat != null){
      let catData=this.httpobj.get("http://localhost:8080/subcategory/search/"+param.value.searchSubCat);
      catData.subscribe((response)=>{ this.allSubCatList=response; 
      console.log(this.allSubCatList);
  });
    } else {
      this.ngOnInit();
    }
  }

}

// Material Select Initialization
// $(document).ready(function() {
//   $('.mdb-select').materialSelect();
//   });
